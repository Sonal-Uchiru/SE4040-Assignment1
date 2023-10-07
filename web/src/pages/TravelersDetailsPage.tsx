import Box from "@mui/material/Box";
import ContainedButton from "../components/atoms/buttons/ContainedButton";
import Title from "../components/atoms/title/Title";
import TravelersDetailsDataTable from "../components/organisms/tables/TravelersDetailsDataTable";
import theme from "../theme/hooks/CreateTheme";

export default function TravelersDetailsPage() {
  function handleClick() {
    console.log("clicked");
  }

  return (
    <>
      <Box sx={{ minHeight: 650 }}>
        <div>
          <Title backicon={false} titleName="Travelers Details" />
          <div style={styles.button}>
            <ContainedButton
              onClick={handleClick}
              title={"Add New Traveler"}
              backgroundColor={theme.palette.darkBlue.main}
              height={60}
              width={200}
            />
          </div>
        </div>

        <div>
          <TravelersDetailsDataTable isDataUpdated={false} />
        </div>
      </Box>
    </>
  );
}

const styles = {
  button: {
    display: "flex",
    justifyContent: "end",
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
};
