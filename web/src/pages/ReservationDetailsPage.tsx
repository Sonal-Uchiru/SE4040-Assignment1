import Box from "@mui/material/Box";
import ReservationDetailsDataTable from "../components/organisms/tables/ReservationDetailsDataTable";
import Title from "../components/atoms/title/Title";

export default function ReservationDetailsPage() {
  function handleClick() {
    console.log("clicked");
  }

  return (
    <>
      <Box sx={{ minHeight: 650 }}>
        <div>
          <Title backicon={false} titleName="Reservation Details" />
        </div>

        <div>
          <ReservationDetailsDataTable isDataUpdated={false} />
        </div>
      </Box>
    </>
  );
}
