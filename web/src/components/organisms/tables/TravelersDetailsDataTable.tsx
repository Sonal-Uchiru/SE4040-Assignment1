import { Box, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import UserProtectedApi from "../../../api/exclusive/userApis/UserProtectedApi";
import { AxiosError } from "axios";
import { getDataArrayByJson } from "../../../utils/datatable/TransformData";
import UpdateTravelersDetailsModal from "../../modals/user/UpdateTravelersDetailsModal";

interface IProp {
  isDataUpdated: boolean;
}

class TravelersData {
  nic: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;

  constructor(
    nic: string,
    firstName: string,
    lastName: string,
    email: string,
    mobile: string
  ) {
    this.nic = nic;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.mobile = mobile;
  }
}

export default function TravelersDetailsDataTable({}: IProp) {
  const [travelers, setTravelers] = React.useState<any[]>([]);
  const [dataTableTravelers, setDataTableTravelers] = React.useState<any>(null);
  const [id, setId] = React.useState(null);
  const [selectedTraveler, setSelectedTraveler] = React.useState<any>({});
  const [isUpdateSuccess, setIsUpdateSuccess] = React.useState(false);

  React.useEffect(() => {
    UserProtectedApi.getListAsync()
      .then((res) => {
        console.log(res.data.items);
        const travelerList = res.data.items.map(
          (item: any) =>
            new TravelersData(
              item.nic,
              item.firstName,
              item.lastName,
              item.email,
              item.mobile
            )
        );
        setTravelers(res.data.items);
        console.log(travelerList);
        setDataTableTravelers(getDataArrayByJson(travelerList));
      })
      .catch((err) => {
        err as AxiosError;
        console.log(err);
      });
  }, [isUpdateSuccess]);

  const options: any = {
    responsive: "standard",
    rowsPerPageOptions: [5, 10, 15, 20],
    rowsPerPage: 10,
    selectableRows: false,

    onTableChange: (action: any, state: any) => {
      // console.log(action);
      // console.log(state);
    },
  };

  const [isOpen, setIsOpen] = React.useState(false);

  function handleClick(travelerId: any, traveler: any) {
    setSelectedTraveler(traveler);
    setIsOpen(!isOpen);
    setId(travelerId); // Set the selected item ID
  }
  const columns = [
    "NIC",
    "First Name",
    "Last Name",
    "Email",
    "Mobile Number",
    {
      name: "Action",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const travelerId = dataTableTravelers[tableMeta.rowIndex][0];
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div>
                <IconButton
                  onClick={() => {
                    handleClick(travelerId, travelers[tableMeta.rowIndex]);
                  }}
                >
                  <img
                    alt="Edit Icon"
                    src="./images/editing.png"
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </IconButton>
                {isOpen && id === travelerId && (
                  <UpdateTravelersDetailsModal
                    handleCancel={() => {
                      handleClick(travelerId, travelers[tableMeta.rowIndex]);
                    }}
                    handleSave={() => {
                      setIsUpdateSuccess(!isUpdateSuccess);
                    }}
                    traveler={selectedTraveler}
                  />
                )}
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    console.log("hi");
                  }}
                >
                  <img
                    alt="Edit Icon"
                    src="./images/trash.png"
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </IconButton>
              </div>
            </div>
          );
        },
      },
    },
  ];

  return (
    <>
      <Box sx={styles.table}>
        {dataTableTravelers && (
          <MUIDataTable
            title={"Travelers List"}
            data={dataTableTravelers}
            columns={columns}
            options={options}
          />
        )}
      </Box>
    </>
  );
}

const styles = {
  table: {
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "20px",
    marginBottom: "10px",
  },
};
