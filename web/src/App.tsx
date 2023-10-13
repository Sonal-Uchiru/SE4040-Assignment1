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
import * as React from "react";
import Footer from "./components/organisms/navigations/Footer";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <React.Suspense fallback="loading">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* <Route path="/updateTrain/:id" element={<UpdateTrainDetailsPage />} /> */}
            <Route
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
                <>
                  <NavigationAppBar />
                  <Private
                    Component={TrainDetailsPage}
                    Role={UserRoles.BackOfficer}
                  />
                </>
              }
            />

            <Route
              path="/updateTrain/:id"
              element={
                <>
                  {" "}
                  <NavigationAppBar />
                  <Private
                    Component={UpdateTrainDetailsPage}
                    Role={UserRoles.BackOfficer}
                  />
                </>
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
              element={
                <>
                  <NavigationAppBar />
                  <ReservationManagementPage />
                </>
              }
            />

            <Route
              path="/reservationDetails"
              element={
                <>
                  <NavigationAppBar />
                  <ReservationDetailsPage />
                </>
              }
            />

            <Route
              path="/payment"
              element={
                <>
                  <NavigationAppBar />
                  <PaymentPage />
                </>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
