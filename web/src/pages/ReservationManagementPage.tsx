import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ContainedButton from "../components/atoms/buttons/ContainedButton";
import CalenderField from "../components/atoms/inputFields/CalenderField";
import InputField from "../components/atoms/inputFields/InputField";
import SelectField from "../components/atoms/selectField/SelectFieldAtom";
import Title from "../components/atoms/title/Title";
import HeadLine2 from "../components/atoms/typographies/HeadLine2";
import ReservationManagementTrainListDataTable from "../components/organisms/tables/ReservationManagementTrainListDataTable";
import theme from "../theme/hooks/CreateTheme";
import * as React from "react";

export default function ReservationManagementPage() {
  const stations = [
    { value: "AHUNGALLE", label: "AHUNGALLE" },
    { value: "BADULLA", label: "BADULLA" },
    { value: "BENTOTA", label: "BENTOTA" },
    { value: "KALUTARA", label: "KALUTARA" },
    { value: "COLOMBO - FORT", label: "COLOMBO - FORT" },
    { value: "GAPMPAHA", label: "GAPMPAHA" },
    { value: "YAGODA", label: "YAGODA" },
  ];

  return (
    <>
      <Box sx={{ minHeight: 650 }}>
        <div>
          <Title backicon={false} titleName="Add Reservation" />
        </div>

        <div
          style={{ display: "flex", justifyContent: "center", padding: 10 }}
        ></div>
        <div>
          <ReservationManagementTrainListDataTable isDataUpdated={false} />
        </div>
      </Box>
    </>
  );
}
