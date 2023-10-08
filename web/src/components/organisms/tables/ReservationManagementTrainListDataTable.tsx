import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import theme from "../../../theme/hooks/CreateTheme";
import ContainedButton from "../../atoms/buttons/ContainedButton";

interface IProp {
  isDataUpdated: boolean;
}

export default function ReservationManagementTrainListDataTable({}: IProp) {
  const data = [
    ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
    ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
    ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
    ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
    ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
    ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
    ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
    ["Udarata Manike", "10:40 AM", "06.55 PM", "20", "3000.00"],
  ];

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
    "Departure Time",
    "Arrival Time",
    "Available Seats",
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
        <MUIDataTable
          title={"Train List"}
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
    marginTop: "20px",
    marginBottom: "10px",
  },
};
