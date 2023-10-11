import { ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddNewTrainPage from "./pages/AddNewTrainPage";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";
import ReservationDetailsPage from "./pages/ReservationDetailsPage";
import ReservationManagementPage from "./pages/ReservationManagementPage";
import TravelersDetailsPage from "./pages/TravelersDetailsPage";
import UpdateTrainDetailsPage from "./pages/UpdateTrainDetailsPage";
import { Private } from "./private/PrivateRoute";
import theme from "./theme/hooks/CreateTheme";
import { UserRoles } from "./types/enums/UserRoles";
import TrainDetailsPage from "./pages/TrainDetailsPage";
import NavigationAppBar from "./components/organisms/navigations/AppBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<TrainDetailsPage />} />
          <Route
            path="//updateTrain/:id"
            element={<UpdateTrainDetailsPage />}
          />
          {/* <Route
            path="/addNewTrain"
            element={
              <>
                <NavigationAppBar />
                <Private
                  Component={AddNewTrainPage}
                  Role={UserRoles.BackOfficer}
                />
              </>
            }
          />

          <Route
            path="/trainDetails"
            element={
              <Private
                Component={TrainDetailsPage}
                Role={UserRoles.BackOfficer}
              />
            }
          />

          <Route
            path="/updateTrain/:id"
            element={
              <Private
                Component={UpdateTrainDetailsPage}
                Role={UserRoles.BackOfficer}
              />
            }
          />

          <Route
            path="/travelersDetails"
            element={
              <>
                <NavigationAppBar />
                <TravelersDetailsPage />
              </>
            }
          />

          <Route
            path="/reservationManagement"
            element={<ReservationManagementPage />}
          />

          <Route
            path="/reservationDetails"
            element={<ReservationDetailsPage />}
          />

          <Route path="/payment" element={<PaymentPage />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

// TODO : Update payment page
// TODO : create a footer
// TODO: add new train is ugly
// TODO: make the update train page similar to add train (change the edit icon to delete icon)
