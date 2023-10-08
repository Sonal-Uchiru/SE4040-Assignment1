import { Box, IconButton } from "@mui/material";
import { AxiosError } from "axios";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import TrainProtectedApi from "../../../api/exclusive/TrainProtectedApi";
import { getDataArrayByJson } from "../../../utils/datatable/TransformData";

interface IProp {
  isDataUpdated: boolean;
}

class TrainData {
  name: string;
  model: string;
  driverName: string;
  contact: string;
  noOfSeats: string;
  startingStation: string;
  endingStation: string;

  constructor(
    name: string,
    model: string,
    driverName: string,
    contact: string,
    noOfSeats: string,
    startingStation: string,
    endingStation: string
  ) {
    this.name = name;
    this.model = model;
    this.driverName = driverName;
    this.contact = contact;
    this.noOfSeats = noOfSeats;
    this.startingStation = startingStation;
    this.endingStation = endingStation;
  }
}

export default function TrainDetailsDataTable({}: IProp) {
  const [trains, setTrains] = React.useState<any[]>([]);
  const [dataTableTrains, setDataTableTrains] = React.useState<any>(null);

  React.useEffect(() => {
    TrainProtectedApi.getListAsync()
      .then((res) => {
        console.log(res.data.items);
        const trainList = res.data.items.map(
          (item: any) =>
            new TrainData(
              item.name,
              item.model,
              item.driverName,
              item.contact,
              item.noOfSeats,
              item.startingStation,
              item.endingStation
            )
        );
        setTrains(res.data.items);
        console.log(trainList);
        setDataTableTrains(getDataArrayByJson(trainList));
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
      console.log(action);
      console.log(state);
    },
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [isPreview, setIsPreview] = React.useState(false);

  function handleClick() {
    console.log("clicked");
  }

  const columns = [
    "Train Name",
    "Model",
    "Driver Name",
    "Contact Number",
    "No of Seats",
    "Starting Station",
    "Ending Station",
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
                    src="./images/eye.png"
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
                    src="./images/multiply.png"
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
        {dataTableTrains && (
          <MUIDataTable
            title={"Train List"}
            data={dataTableTrains}
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
    marginTop: "40px",
    marginBottom: "10px",
  },
};
