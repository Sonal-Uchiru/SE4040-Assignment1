import { Box, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";

interface IProp {
  schedules: any[];
}

export default function TrainScheduleTable({ schedules }: IProp) {
  const formattedData = schedules.map((schedule) => ({
    Frequency: schedule.frequency,
    "Departure Time": schedule.departureTime,
    "Arrival Time": schedule.arrivalTime,
    "Return Trip": schedule.isReturnTrip ? "True" : "False",
  }));

  console.log(schedules);
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
    "Return Trip",
  ];

  return (
    <>
      <Box sx={styles.table}>
        <MUIDataTable
          title={"Train Schedule"}
          data={formattedData}
          columns={columns}
          options={options}
        />
      </Box>
    </>
  );
}

const styles = {
  table: {
    marginTop: "20px",
    marginBottom: "80px",
    maxHeight: "400px",
  },
};
