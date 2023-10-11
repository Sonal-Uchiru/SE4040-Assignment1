import Box from "@mui/material/Box";
import * as React from "react";
import ContainedButton from "../components/atoms/buttons/ContainedButton";
import Title from "../components/atoms/title/Title";
import TravelersDetailsDataTable from "../components/organisms/tables/TravelersDetailsDataTable";
import theme from "../theme/hooks/CreateTheme";
import AddNewTravelerModal from "../components/modals/user/AddNewTravelerModal";
import UserProtectedApi from "../api/exclusive/userApis/UserProtectedApi";
import UserUnprotectedApi from "../api/exclusive/userApis/UserUnprotectedApi";

export default function TravelersDetailsPage() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = (values: any) => {
    UserProtectedApi.saveAsync(values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsOpen(false);
  };

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

        <TravelersDetailsDataTable isDataUpdated={false} />

        {isOpen && (
          <AddNewTravelerModal
            handleCancel={() => {
              setIsOpen(!isOpen);
            }}
            handleSave={handleSave}
          />
        )}
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
