import { Box, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";
interface IProp {
  schedules: any[];
  onRemoveSchedule: (indexToRemove: number) => void;
}

export default function TrainScheduleUpdateTable({
  schedules,
  onRemoveSchedule,
}: IProp) {
  const [visibleSchedules, setVisibleSchedules] = React.useState(schedules); // Initialize with all schedules

  function removeSchedule(indexToRemove: number) {
    const updatedSchedules = visibleSchedules.filter(
      (_, index) => index !== indexToRemove
    );
    onRemoveSchedule(indexToRemove);
    setVisibleSchedules(updatedSchedules);
    console.log(updatedSchedules);
  }
  React.useEffect(() => {
    setVisibleSchedules(schedules); // Update the visibleSchedules when the prop changes
  }, [schedules]);

  const formattedData = visibleSchedules.map((schedule) => ({
    Frequency: schedule.frequency,
    "Departure Time": schedule.departureTime,
    "Arrival Time": schedule.arrivalTime,
    "Return Trip": schedule.isReturnTrip ? "True" : "False",
  }));

  const options: any = {
    responsive: "standard",
    rowsPerPageOptions: [3],
    rowsPerPage: 5,
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
                <IconButton onClick={() => removeSchedule(tableMeta.rowIndex)}>
                  <img
                    alt="Edit Icon"
                    src="/images/trash.png"
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
        <MUIDataTable
          title={"Train Schedules"}
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
