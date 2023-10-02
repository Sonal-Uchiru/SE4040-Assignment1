import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Title from "../../components/atoms/title/Title";
import ResearchFindingsListDataTable from "../../components/organisms/tables/ResearchFindingsListDataTable";
import ContainedButton from "../../components/atoms/buttons/ContainedButton";
import theme from "../../theme/hooks/CreateTheme";
import OfficerAddNewResearchPaperModal from "../../components/modals/officer/OfficerAddNewResearchPaperModal";
import ResearchDisseminationProtectedApi from "../../api/exclusive/ResearchDisseminationProtectedApi";
import { uploadResearchPaperAsync } from "../../utils/firebase/UploadFile";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertColor } from "@mui/material";
import { AxiosError } from "axios";
import Avatar from "@mui/material/Avatar";
import { t } from "i18next";
import ResearchDisseminationService from "../../api/services/ResearchDisseminationService";
import ErrorModal from "../../components/modals/ErrorModal";
import SuccessModal from "../../components/modals/SuccessModal";
import TravelersDetailsDataTable from "../../components/organisms/tables/TravelersDetailsDataTable";
import TrainDetailsDataTable from "../../components/organisms/tables/TrainDetailsDataTable";
import InputField from "../../components/atoms/inputFields/InputField";
import CalenderField from "../../components/atoms/inputFields/CalenderField";
import SelectField from "../../components/atoms/selectField/SelectFieldAtom";
import TrainScheduleModalTable from "../../components/organisms/tables/TrainScheduleModalTable";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function LoginPage() {
  function handleClick() {
    console.log("clicked");
  }

  return (
    <>
      <Box sx={{ minHeight: 650 }}>
        <div>
          <div>
            <Grid container>
              <Grid item xs={12} lg={8} md={12}>
                <div style={styles.images}>
                  <Avatar
                    alt="Research Image"
                    src="./images/login.jpg"
                    style={{
                      marginTop: 20,
                      height: 660,
                      width: 980,
                      borderRadius: 10,
                      marginLeft: 10,
                      marginRight: 10,
                      objectFit: "contain",
                    }}
                    variant="rounded"
                  />
                </div>
              </Grid>

              <Grid item xs={12} lg={4} md={12}>
                <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                  <TrainScheduleModalTable />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </>
  );
}

const styles = {
  images: {
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    marginBottom: 10,
  },

  button: {
    marginTop: 30,
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
