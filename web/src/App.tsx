import { ThemeProvider } from "@mui/material";
import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Private } from "./private/PrivateRoute";
import theme from "./theme/hooks/CreateTheme";
import Footer from "./components/organisms/navigations/Footer";
import { UserRoles } from "./types/enums/UserRoles";
import TravelersDetailsDataTable from "./components/organisms/tables/TravelersDetailsDataTable";
import TravelersDetailsPage from "./pages/TravelersDetailsPage";
import ReservationDetailsDataTable from "./components/organisms/tables/ReservationDetailsDataTable";
import ReservationDetailsPage from "./pages/ReservationDetailsPage";
import TrainDetailsDataTable from "./components/organisms/tables/TrainDetailsDataTable";
import TrainDetailsPage from "./pages/TrainDetailsPage";
import UpdateTravelersDetailsModal from "./components/modals/user/UpdateTravelersDetailsModal";
import AddNewTravelerModal from "./components/modals/user/AddNewTravelerModal";
import UpdateReservationModal from "./components/modals/reservation/UpdateReservationModal";
import PaymentSuccessModal from "./components/modals/PaymentSuccessModal";
import ReservationManagementTrainListDataTable from "./components/organisms/tables/ReservationManagementTrainListDataTable";
import ReservationManagementPage from "./pages/ReservationManagementPage";
import ViewTrainScheduleModal from "./components/modals/train/ViewTrainScheduleModal";
import TrainScheduleModalTable from "./components/organisms/tables/TrainScheduleModalTable";
import AddNewTrainPage from "./pages/AddNewTrainPage";
import TrainScheduleUpdateTable from "./components/organisms/tables/TrainScheduleUpdateTable";
import UpdateTrainDetailsPage from "./pages/UpdateTrainDetailsPage";
import DisplaySummaryModal from "./components/modals/reservation/DisplaySummaryModal";
import LoginPage from "./pages/LoginPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/travelersDetails" element={<TravelersDetailsPage />} />
          <Route path="/trainDetails" element={<TrainDetailsPage />} />
          <Route path="/addNewTrain" element={<AddNewTrainPage />} />
          <Route path="/updateTrain" element={<UpdateTrainDetailsPage />} />
          <Route
            path="/reservationManagement"
            element={<ReservationManagementPage />}
          />
          <Route path="/payment" element={<PaymentPage />} />
          <Route
            path="/reservationDetails"
            element={<ReservationDetailsPage />}
          />

          {/* Back Officer */}

          {/* <Route
            path="/travelersDetails"
            element={
              <>
                <Private
                  Component={TravelersDetailsPage}
                  Role={UserRoles.BackOfficer}
                />
              </>
            }
          /> */}
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
