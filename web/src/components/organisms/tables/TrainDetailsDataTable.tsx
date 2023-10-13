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
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbars from "../../atoms/snackBar/SnackBar";

interface IProp {
  isDataUpdated: boolean;
}

class TrainData {
  name: string;
  model: string;
  driverName: string;
  contact: number;
  noOfSeats: string;
  startingStation: string;
  endingStation: string;

  constructor(
    name: string,
    model: string,
    driverName: string,
    contact: number,
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
  const [showSnackBar, setShowSnackBar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    "success" | "error" | "info" | "warning"
  >("success");

  React.useEffect(() => {
    setErrorModalVisibility(false);
    TrainProtectedApi.getListAsync()
      .then((res) => {
        console.log(res.data.items);
        const trainList = res.data.items.map(
          (item: any) =>
            new TrainData(
              item.name ? item.name : "Not Available",
              item.model ? item.model : "Not Available",
              item.driverName ? item.driverName : "Not Available",
              item.contact ? item.contact : "Not Available",
              item.noOfSeats ? item.noOfSeats : "Not Available",
              item.startingStation ? item.startingStation : "Not Available",
              item.endingStation ? item.endingStation : "Not Available"
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

  const handleSwitchChange = (rowIndex: any) => {
    const updatedTrain = { ...trains[rowIndex] };
    updatedTrain.isEnabled = !updatedTrain.isEnabled;
    const updatedTrains = [...trains];
    updatedTrains[rowIndex] = updatedTrain;
    setTrains(updatedTrains);
    TrainProtectedApi.toggleActivationAsync(updatedTrain.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err as AxiosError;
        console.log(err);
      });
  };

  const handleDeleteTrain = (trainId: any) => {
    TrainProtectedApi.deleteAsync(trainId)
      .then((res) => {
        TrainProtectedApi.getListAsync()
          .then((res) => {
            const updatedTrainList = res.data.items.map(
              (item: any) =>
                new TrainData(
                  item.name ? item.name : "Not Available",
                  item.model ? item.model : "Not Available",
                  item.driverName ? item.driverName : "Not Available",
                  item.contact ? item.contact : "Not Available",
                  item.noOfSeats ? item.noOfSeats : "Not Available",
                  item.startingStation ? item.startingStation : "Not Available",
                  item.endingStation ? item.endingStation : "Not Available"
                )
            );
            // Update the state with the new list of customers.
            setTrains(res.data.items);
            setDataTableTrains(getDataArrayByJson(updatedTrainList));
            setSnackbarMessage("Successfully deleted the train!🙂");
            setSnackbarSeverity("success");
            setShowSnackBar(true);
          })
          .catch((err) => {
            err as AxiosError;
            console.error(err);
          });
      })
      .catch((err) => {
        err as AxiosError;
        console.error(err?.response?.data?.message);
      });
  };

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#03C988" : "#03C988",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#03C988",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#F34E4E" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

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
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ marginLeft: 3, marginTop: 1, marginRight: -1 }}
                      checked={trains[tableMeta.rowIndex].isEnabled}
                      onChange={() => handleSwitchChange(tableMeta.rowIndex)}
                      defaultChecked
                    />
                  }
                  label=""
                />
              </div>

              <div>
                <IconButton
                  onClick={() => {
                    handleDeleteTrain(trains[tableMeta.rowIndex].id);
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
      {showSnackBar && (
        <div>
          <Snackbars
            message={snackbarMessage}
            severity={snackbarSeverity}
            vertical={"top"}
            horizontal={"right"}
            open={showSnackBar}
            onClose={() => setShowSnackBar(false)}
          />
        </div>
      )}
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
