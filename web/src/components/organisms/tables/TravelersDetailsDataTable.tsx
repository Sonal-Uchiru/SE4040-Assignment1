import { Box, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import UserProtectedApi from "../../../api/exclusive/userApis/UserProtectedApi";
import { AxiosError } from "axios";

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
        setDataTableTravelers(travelerList);
      })
      .catch((err) => {
        err as AxiosError;
        console.log(err);
      });
  }, []);

  const options: any = {
    responsive: "standard",
    rowsPerPageOptions: [5, 10, 15, 20],
    rowsPerPage: 10,

    onTableChange: (action: any, state: any) => {
      // console.log(action);
      // console.log(state);
    },
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [isPreview, setIsPreview] = React.useState(false);

  function handleClick() {
    console.log("clicked");
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
                    handleClick();
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
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    handleClick();
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
