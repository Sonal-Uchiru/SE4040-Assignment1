import { Box, IconButton } from "@mui/material";
import { AxiosError } from "axios";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import TrainProtectedApi from "../../../api/exclusive/TrainProtectedApi";
import { getDataArrayByJson } from "../../../utils/datatable/TransformData";
import ViewTrainScheduleModal from "../../modals/train/ViewTrainScheduleModal";
import { useNavigate } from "react-router-dom";
import ContentLoadingBar from "../../atoms/Loadings/ContentLoadingBar";
import ErrorModal from "../../modals/ErrorModal";

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
  const navigate = useNavigate();
  const [trains, setTrains] = React.useState<any[]>([]);
  const [dataTableTrains, setDataTableTrains] = React.useState<any>(null);
  const [id, setId] = React.useState(null);
  const [selectedTrain, setSelectedTrain] = React.useState<any>({});
  const [isUpdateSuccess, setIsUpdateSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorModalVisibility, setErrorModalVisibility] = React.useState(false);

  React.useEffect(() => {
    setErrorModalVisibility(false);
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
        setDataTableTrains(getDataArrayByJson(trainList));
        setIsLoading(false);
      })
      .catch((err) => {
        err as AxiosError;
        setIsLoading(false);
        setErrorModalVisibility(true);
        console.log(err);
      });
  }, [isUpdateSuccess]);

  const options: any = {
    responsive: "standard",
    rowsPerPageOptions: [5, 10, 15, 20],
    rowsPerPage: 10,
    selectableRows: false,

    onTableChange: (action: any, state: any) => {
      console.log(action);
      console.log(state);
    },
  };

  const [isOpenSchedules, setIsOpenSchedules] = React.useState(false);

  function handleClick(trainId: any, train: any) {
    setSelectedTrain(train);
    setIsOpenSchedules(!isOpenSchedules);
    setId(trainId); // Set the selected item ID
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
          const trainId = dataTableTrains[tableMeta.rowIndex][0];
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
                    handleClick(trainId, trains[tableMeta.rowIndex]);
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
                {isOpenSchedules && id === trainId && (
                  <ViewTrainScheduleModal
                    handleCancel={() => {
                      handleClick(trainId, trains[tableMeta.rowIndex]);
                    }}
                    train={selectedTrain}
                  />
                )}
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    navigate(`/updateTrain/${trains[tableMeta.rowIndex].id}`);
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
                    console.log("hi");
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
      {!isLoading ? (
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
      ) : (
        <ContentLoadingBar />
      )}

      {errorModalVisibility && (
        <ErrorModal handleCancel={() => setErrorModalVisibility(false)} />
      )}
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
