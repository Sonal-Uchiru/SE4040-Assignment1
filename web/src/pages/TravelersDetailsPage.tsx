import Box from "@mui/material/Box";
import * as React from "react";
import ContainedButton from "../components/atoms/buttons/ContainedButton";
import Title from "../components/atoms/title/Title";
import TravelersDetailsDataTable from "../components/organisms/tables/TravelersDetailsDataTable";
import theme from "../theme/hooks/CreateTheme";
import AddNewTravelerModal from "../components/modals/user/AddNewTravelerModal";
import UserProtectedApi from "../api/exclusive/userApis/UserProtectedApi";
import Snackbars from "../components/atoms/snackBar/SnackBar";

export default function TravelersDetailsPage() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDataUpdated, setIsDataUpdated] = React.useState(false); // State to trigger data update
  const [showSnackBar, setShowSnackBar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(""); // State to store the error message

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSave = (values: any) => {
    if (values.nic && values.password && values.role)
      UserProtectedApi.saveAsync(values)
        .then((res) => {
          setIsOpen(false);
          setIsDataUpdated(!isDataUpdated);
        })
        .catch((err) => {
          const errorMessage = err?.response?.data?.message;
          setErrorMessage(errorMessage);
        });
    else {
      setShowSnackBar(true);
    }
  };

  return (
    <>
      {showSnackBar && (
        <div>
          <Snackbars
            message={"Please fill all the required fields"}
            severity={"error"}
            vertical={"top"}
            horizontal={"center"}
            open={showSnackBar}
            onClose={() => setShowSnackBar(false)}
          />
        </div>
      )}
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

        <TravelersDetailsDataTable isDataUpdated={isDataUpdated} />

        {isOpen && (
          <AddNewTravelerModal
            handleCancel={() => {
              setIsOpen(!isOpen);
            }}
            handleSave={handleSave}
            errorMessage={errorMessage}
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
