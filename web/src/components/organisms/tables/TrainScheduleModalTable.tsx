import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";

export default function TrainScheduleModalTable() {
  const data = [
    ["Daily", "06:55 AM", "06:00 PM", "True"],
    ["Week Days", "06:55 AM", "06:00 PM", "True"],
    ["Week Ends", "06:55 AM", "06:00 PM", "True"],
    ["Daily", "06:55 AM", "06:00 PM", "True"],
  ];

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
          data={data}
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
    marginBottom: "20px",
    maxHeight: "400px",
  },
};
