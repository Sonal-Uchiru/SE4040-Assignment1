import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import theme from "../../../theme/hooks/CreateTheme";
import ContainedButton from "../../atoms/buttons/ContainedButton";
import TrainProtectedApi from "../../../api/exclusive/TrainProtectedApi";
import { getDataArrayByJson } from "../../../utils/datatable/TransformData";
import { AxiosError } from "axios";
import DisplaySummaryModal from "../../modals/reservation/DisplaySummaryModal";
import ContentLoadingBar from "../../atoms/Loadings/ContentLoadingBar";
import ErrorModal from "../../modals/ErrorModal";
interface IProp {
  isDataUpdated: boolean;
}

class ScheduleData {
  name: string;
  startingStation: string;
  endingStation: string;
  arrivalTime: string;
  departureTime: string;
  frequency: string;
  price: string;

  constructor(
    name: string,
    startingStation: string,
    endingStation: string,
    arrivalTime: string,
    departureTime: string,
    frequency: string,
    price: string
  ) {
    {
      this.name = name;
      this.startingStation = startingStation;
      this.endingStation = endingStation;
      this.arrivalTime = arrivalTime;
      this.departureTime = departureTime;
      this.frequency = frequency;
      this.price = price;
    }
  }
}

export default function ReservationManagementTrainListDataTable({}: IProp) {
  const [schedules, setSchedules] = React.useState<any[]>([]);
  const [dataTableSchedules, setDataTableSchedules] = React.useState<any>(null);
  const [id, setId] = React.useState(null);
  const [selectedTrain, setSelectedTrain] = React.useState<any>({});
  const [isUpdateSuccess, setIsUpdateSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorModalVisibility, setErrorModalVisibility] = React.useState(false);

  React.useEffect(() => {
    setErrorModalVisibility(false);
    TrainProtectedApi.getScheduleListAsync()
      .then((res) => {
        console.log(res.data.items);
        const scheduleList = res.data.items.map(
          (item: any) =>
            new ScheduleData(
              item.name,
              item.startingStation,
              item.endingStation,
              item.arrivalTime,
              item.departureTime,
              item.frequency,
              item.price
            )
        );
        setSchedules(res.data.items);
        setDataTableSchedules(getDataArrayByJson(scheduleList));
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

  const [isOpen, setIsOpen] = React.useState(false);

  function handleClick(trainId: any, train: any) {
    setSelectedTrain(train);
    setIsOpen(!isOpen);
    setId(trainId); // Set the selected item ID
  }

  const columns = [
    "Train Name",
    "Starting Station",
    "Ending Station",
    "Departure Time",
    "Arrival Time",
    "Frequency",
    "Price (LKR.)",
    {
      name: "Action",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const trainId = dataTableSchedules[tableMeta.rowIndex][0];
          return (
            <div style={{ justifyContent: "center" }}>
              <div>
                <ContainedButton
                  title={"Book"}
                  backgroundColor={theme.palette.primary.main}
                  width={90}
                  onClick={() => {
                    handleClick(trainId, schedules[tableMeta.rowIndex]);
                  }}
                />
                {isOpen && id === trainId && (
                  <DisplaySummaryModal
                    handleCancel={() => {
                      handleClick(trainId, schedules[tableMeta.rowIndex]);
                    }}
                    train={selectedTrain}
                    handleConfirm={() => {
                      setIsUpdateSuccess(!isUpdateSuccess);
                    }}
                  />
                )}
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
          {dataTableSchedules && (
            <MUIDataTable
              title={"Train List"}
              data={dataTableSchedules}
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
    marginTop: "20px",
    marginBottom: "10px",
  },
};
