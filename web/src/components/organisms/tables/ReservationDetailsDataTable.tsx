import { Box, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";

interface IProp {
  isDataUpdated: boolean;
}

export default function ReservationDetailsDataTable({}: IProp) {
  const data = [
    [
      "Udarata Manike",
      "2023-09-25",
      "08:55 AM",
      "05:55 PM",
      "10",
      "1000.00",
      "10000.00",
    ],
    [
      "Udarata Manike",
      "2023-09-25",
      "08:55 AM",
      "05:55 PM",
      "10",
      "1000.00",
      "10000.00",
    ],
    [
      "Udarata Manike",
      "2023-09-25",
      "08:55 AM",
      "05:55 PM",
      "10",
      "1000.00",
      "10000.00",
    ],
    [
      "Udarata Manike",
      "2023-09-25",
      "08:55 AM",
      "05:55 PM",
      "10",
      "1000.00",
      "10000.00",
    ],
    [
      "Udarata Manike",
      "2023-09-25",
      "08:55 AM",
      "05:55 PM",
      "10",
      "1000.00",
      "10000.00",
    ],
    [
      "Udarata Manike",
      "2023-09-25",
      "08:55 AM",
      "05:55 PM",
      "10",
      "1000.00",
      "10000.00",
    ],
    [
      "Udarata Manike",
      "2023-09-25",
      "08:55 AM",
      "05:55 PM",
      "10",
      "1000.00",
      "10000.00",
    ],
    [
      "Udarata Manike",
      "2023-09-25",
      "08:55 AM",
      "05:55 PM",
      "10",
      "1000.00",
      "10000.00",
    ],
    [
      "Udarata Manike",
      "2023-09-25",
      "08:55 AM",
      "05:55 PM",
      "10",
      "1000.00",
      "10000.00",
    ],
  ];

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
    "Departure Date",
    "Departure Time",
    "Arrival Time",
    "No of Seats Reserved",
    "Per Person Price (LKR.)",
    "Total Price (LKR.)",
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
          title={"Reservation List"}
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
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "40px",
    marginBottom: "10px",
  },
};
