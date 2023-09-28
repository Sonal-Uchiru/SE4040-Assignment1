import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Grid } from "@mui/material";
import Title from "../components/atoms/title/Title";
import ResearchFindingsListDataTable from "../components/organisms/tables/ResearchFindingsListDataTable";
import ContainedButton from "../components/atoms/buttons/ContainedButton";
import theme from "../theme/hooks/CreateTheme";
import OfficerAddNewResearchPaperModal from "../components/modals/officer/OfficerAddNewResearchPaperModal";
import ResearchDisseminationProtectedApi from "../api/exclusive/ResearchDisseminationProtectedApi";
import { uploadResearchPaperAsync } from "../utils/firebase/UploadFile";
import Snackbar from "@mui/material/Snackbar";
import { AxiosError } from "axios";
import { t } from "i18next";
import ResearchDisseminationService from "../api/services/ResearchDisseminationService";
import ErrorModal from "../components/modals/ErrorModal";
import SuccessModal from "../components/modals/SuccessModal";
import TravelersDetailsDataTable from "../components/organisms/tables/TravelersDetailsDataTable";
import ReservationDetailsDataTable from "../components/organisms/tables/ReservationDetailsDataTable";
import ReservationManagementTrainListDataTable from "../components/organisms/tables/ReservationManagementTrainListDataTable";
import HeadLine2 from "../components/atoms/typographies/HeadLine2";
import InputField from "../components/atoms/inputFields/InputField";
import CalenderField from "../components/atoms/inputFields/CalenderField";
import SelectField from "../components/atoms/selectField/SelectFieldAtom";

export default function ReservationManagementPage() {
  function handleClick() {
    console.log("clicked");
  }

  const options = [
    { value: "option1", label: "option1" },
    { value: "option2", label: "option2" },
    { value: "option3", label: "option3" },
    { value: "option4", label: "option4" },
  ];

  return (
    <>
      <Box sx={{ minHeight: 650 }}>
        <div style={{ marginTop: 30 }}>
          <Title backicon={false} titleName="Add Reservation" />
        </div>

        <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
          <div style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: theme.palette.primary.main,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                height: 100,
              }}
            >
              <div style={{ marginTop: 20 }}>
                <HeadLine2
                  text={"Book Your Seats"}
                  color={theme.palette.white.main}
                />
              </div>
            </div>

            {/* row 1 */}

            <div>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6} md={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 30,
                    }}
                  >
                    <SelectField
                      label={"Starting Station"}
                      placeholder={"Select Starting Station"}
                      options={options}
                      width={250}
                      name="startingStation"
                      onChange={(e) => {}}
                      required={true}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} lg={6} md={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 30,
                    }}
                  >
                    <SelectField
                      label={"Ending Station"}
                      placeholder={"Select Ending Station"}
                      options={options}
                      width={250}
                      name="endingStation"
                      onChange={(e) => {}}
                      required={true}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* row 2 */}

            <div style={{ marginTop: 20 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6} md={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 30,
                    }}
                  >
                    <InputField
                      id={"passengers"}
                      label={"No of Passengers"}
                      type={"number"}
                      placeholder={"Enter Passenger Count"}
                      width={250}
                      name="passengers"
                      onChange={(e) => {}}
                      required={true}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} lg={6} md={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 30,
                    }}
                  >
                    <CalenderField label={"Date"} required={true} />
                  </div>
                </Grid>
              </Grid>
            </div>

            <div
              style={styles.button}
              className="btn-toolbar"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div
                className="btn-group"
                role="group"
                aria-label="First group"
                style={styles.buttonGroup}
              >
                <ContainedButton
                  title={"Search"}
                  color={theme.palette.white.main}
                  backgroundColor={theme.palette.primary.main}
                  width={100}
                />
              </div>
              <div
                className="btn-group"
                role="group"
                aria-label="Third group"
                style={styles.buttonGroup2}
              >
                <ContainedButton
                  title={"Reset"}
                  color={theme.palette.white.main}
                  backgroundColor={theme.palette.neutral.main}
                  onClick={handleClick}
                  width={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReservationManagementTrainListDataTable isDataUpdated={false} />
        </div>
      </Box>
    </>
  );
}

const styles = {
  card: {
    minHeight: 400,
    borderWidth: 2,
    maxWidth: 800,
    border: "solid",
    borderRadius: 20,
    marginTop: 20,
    borderColor: theme.palette.darkBlue.main,
  },

  input1: {
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
    justifyContent: "center",
  },

  input2: {
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
    justifyContent: "center",
  },

  button: {
    marginTop: 50,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 40,
  },

  buttonGroup2: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },

  buttonGroup: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
};
