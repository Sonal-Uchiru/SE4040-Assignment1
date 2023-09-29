import { ThemeProvider } from "@mui/material";
import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AgrivoAppBar from "./components/organisms/navigations/AppBar";
import DrawPaddyFieldToolPage from "./pages/DrawPaddyFieldToolPage";
import FinalizedTimeSchedulePage from "./pages/FinalizedTimeSchedulePage";
import ForgotPasswordPage from "./pages/ForgotPassordPage";
import LoginAndRegisterPage from "./pages/LoginAndRegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import PaddyFieldDetailsPage from "./pages/PaddyFieldDetailsPage";
import PriorityDistributionSchedulePage from "./pages/PriorityDistributionSchedulePage";
import PriorityDistributionScheduleStepsPage from "./pages/PriorityDistributionScheduleStepsPage";
import ResearchFindingsPage from "./pages/ResearchFindingsPage";
import ViewPaddyFieldPage from "./pages/ViewPaddyFieldPage";
import { Private } from "./private/PrivateRoute";
import theme from "./theme/hooks/CreateTheme";
import Footer from "./components/organisms/navigations/Footer";
import { UserRoles } from "./types/enums/UserRoles";
import FinalizedTimeScheduleDataTable from "./components/organisms/tables/FinalizedTimeScheduleDataTable";
import TravelersDetailsDataTable from "./components/organisms/tables/TravelersDetailsDataTable";
import TravelersDetailsPage from "./pages/bookingPassage/TravelersDetailsPage";
import ReservationDetailsDataTable from "./components/organisms/tables/ReservationDetailsDataTable";
import ReservationDetailsPage from "./pages/bookingPassage/ReservationDetailsPage";
import TrainDetailsDataTable from "./components/organisms/tables/TrainDetailsDataTable";
import TrainDetailsPage from "./pages/bookingPassage/TrainDetailsPage";
import UpdateTravelersDetailsModal from "./components/modals/user/UpdateTravelersDetailsModal";
import AddNewTravelerModal from "./components/modals/user/AddNewTravelerModal";
import UpdateReservationModal from "./components/modals/reservation/UpdateReservationModal";
import PaymentSuccessModal from "./components/modals/PaymentSuccessModal";
import ReservationManagementTrainListDataTable from "./components/organisms/tables/ReservationManagementTrainListDataTable";
import ReservationManagementPage from "./pages/bookingPassage/ReservationManagementPage";
import OfficerAddNewResearchPaperModal from "./components/modals/officer/OfficerAddNewResearchPaperModal";
import OfficerAddNewFieldModal from "./components/modals/officer/OfficerAddNewFieldModal";

function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ReservationManagementPage />
      </Router>
    </ThemeProvider>
  );
}

export default App;
