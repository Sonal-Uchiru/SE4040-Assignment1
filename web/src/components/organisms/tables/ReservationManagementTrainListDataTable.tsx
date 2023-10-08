import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import theme from "../../../theme/hooks/CreateTheme";
import ContainedButton from "../../atoms/buttons/ContainedButton";
import TrainProtectedApi from "../../../api/exclusive/TrainProtectedApi";
import { getDataArrayByJson } from "../../../utils/datatable/TransformData";
import { AxiosError } from "axios";

interface IProp {
  isDataUpdated: boolean;
}

class ScheduleData {
  trainName: string;
  startingStation: string;
  endingStation: string;
  arrivalTime: string;
  departureTime: string;
  frequency: string;
  price: string;

  constructor(
    trainName: string,
    startingStation: string,
    endingStation: string,
    arrivalTime: string,
    departureTime: string,
    frequency: string,
    price: string
  ) {
    {
      this.trainName = trainName;
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

  React.useEffect(() => {
    TrainProtectedApi.getScheduleListAsync()
      .then((res) => {
        console.log(res.data.items);
        const scheduleList = res.data.items.map(
          (item: any) =>
            new ScheduleData(
              item.trainName,
              item.startingStation,
              item.endingStation,
              item.arrivalTime,
              item.departureTime,
              item.frequency,
              item.price
            )
        );
        setSchedules(res.data.items);
        console.log(scheduleList);
        setDataTableSchedules(getDataArrayByJson(scheduleList));
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
    selectableRows: false,

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
          return (
            <div style={{ justifyContent: "center" }}>
              <div>
                <ContainedButton
                  title={"Book"}
                  backgroundColor={theme.palette.primary.main}
                  width={90}
                />
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
        {dataTableSchedules && (
          <MUIDataTable
            title={"Train List"}
            data={dataTableSchedules}
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
