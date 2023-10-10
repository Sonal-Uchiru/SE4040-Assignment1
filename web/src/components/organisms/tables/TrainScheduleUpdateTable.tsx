import { Box, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";

export default function TrainScheduleUpdateTable() {
  const data = [
    ["Daily", "06:55 AM", "06:00 PM", "True"],
    ["Week Days", "06:55 AM", "06:00 PM", "True"],
    ["Week Ends", "06:55 AM", "06:00 PM", "True"],
    ["Daily", "06:55 AM", "06:00 PM", "True"],
  ];

  function handleClick() {
    console.log("clicked");
  }

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
    marginBottom: "80px",
    maxHeight: "400px",
  },
};
