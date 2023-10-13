import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import TrainProtectedApi from "../../../api/exclusive/TrainProtectedApi";
import { getDataArrayByJson } from "../../../utils/datatable/TransformData";
import { AxiosError } from "axios";

interface IProps {
  trainID: any;
}

class ScheduleData {
  frequency: string;
  arrivalTime: string;
  departureTime: string;
  isReturnTrip: string;

  constructor(
    frequency: string,
    arrivalTime: string,
    departureTime: string,
    isReturnTrip: string
  ) {
    this.frequency = frequency;
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
    this.isReturnTrip = isReturnTrip;
  }
}

export default function TrainScheduleModalTable({ trainID }: IProps) {
  const [schedule, setSchedule] = React.useState<any[]>([]);
  const [dataTableSchedule, setDataTableSchedule] = React.useState<any>(null);

  React.useEffect(() => {
    TrainProtectedApi.getTrainScheduleListAsync(trainID)
      .then((res) => {
        console.log(res.data.items);
        const scheduleList = res.data.items.map(
          (item: any) =>
            new ScheduleData(
              item.frequency,
              item.arrivalTime,
              item.departureTime,
              item.isReturnTrip
            )
        );
        setSchedule(res.data.items);
        console.log(scheduleList);
        setDataTableSchedule(getDataArrayByJson(scheduleList));
      })
      .catch((err) => {
        err as AxiosError;
        console.log(err);
      });
  }, []);

  const options: any = {
    responsive: "standard",
    rowsPerPageOptions: [3],
    rowsPerPage: 3,
    selectableRows: false,

    onTableChange: (action: any, state: any) => {
      console.log(action);
      console.log(state);
    },
  };

  const columns = [
    "Frequency",
    "Departure Time",
    "Arrival Time",
    {
      name: "Return Trip",
      options: {
        customBodyRender: (value: any) => (value ? "true" : "false"),
      },
    },
  ];

  return (
    <>
      <Box sx={styles.table}>
        {dataTableSchedule && (
          <MUIDataTable
            title={"Train Schedule"}
            data={dataTableSchedule}
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
    marginTop: "20px",
    marginBottom: "20px",
    maxHeight: "400px",
  },
};
