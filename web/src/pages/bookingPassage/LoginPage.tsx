import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Link } from "@mui/material";
import Title from "../../components/atoms/title/Title";
import ResearchFindingsListDataTable from "../../components/organisms/tables/ResearchFindingsListDataTable";
import ContainedButton from "../../components/atoms/buttons/ContainedButton";
import theme from "../../theme/hooks/CreateTheme";
import OfficerAddNewResearchPaperModal from "../../components/modals/officer/OfficerAddNewResearchPaperModal";
import ResearchDisseminationProtectedApi from "../../api/exclusive/ResearchDisseminationProtectedApi";
import { uploadResearchPaperAsync } from "../../utils/firebase/UploadFile";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertColor } from "@mui/material";
import axios, { AxiosError, AxiosResponse } from "axios";
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
import HeadLine3 from "../../components/atoms/typographies/HeadLine3";
import ParagraphBold from "../../components/atoms/typographies/ParagraphBold";
import PasswordInputField from "../../components/atoms/inputFields/PasswordInputField";
import HeadLine1 from "../../components/atoms/typographies/HeadLine1";
import HeadLine2 from "../../components/atoms/typographies/HeadLine2";
import HeadLine4 from "../../components/atoms/typographies/HeadLine4";

export default function LoginPage() {
  function handleClick() {
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RfQXV0aGVudGljYXRpb24iLCJqdGkiOiI1OWM4NzJmMy1iODkxLTQ4NzEtODg0Yy0wNzI0MjQ0OTFmYzAiLCJpYXQiOjE2OTY0NDA1NzIsInVzZXJfaWQiOiI5Y2NmYmNkYS0wMDA2LTQyNTMtOWVkOS0zNGRjOTM4MjBhYjciLCJyb2xlIjoiQmFja09mZmljZXIiLCJleHAiOjE2OTY0NDQxNzIsImlzcyI6ImJvb2tpbmdfcGFzc2FnZV9jb3JlIiwiYXVkIjoiYm9va2luZ19wYXNzYWdlX2NsaWVudCJ9.jVaSEVFd1h8DEGZqjK3Y0DuCQL3XGgM1CxKuKc_O8Sg'
    axios({
      url: `https://localhost:7142/api/v1/users/reservations/list`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
    },
  })
      .then((res: AxiosResponse) => {
          console.log(res)
      })
      .catch((err: AxiosError) => {
          console.log(err)
      })
   
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
                  <div
                    style={{
                      position: "absolute",
                      top: "37%", // Adjust the top position as needed
                      left: "33.5%", // Adjust the left position as needed
                      transform: "translate(-50%, -50%)", // Center the text
                      color: "white", // Text color
                      // Text font size
                      fontWeight: "bold", // Text font weight
                      background: "rgba(0, 0, 0, 0.5)", // Background color with transparency
                      padding: "10px 20px", // Padding for the text
                      borderRadius: "5px", // Border radius for the background
                    }}
                  >
                    <HeadLine1
                      text={"Welcome to Sri Lanka Railways"}
                      color={theme.palette.cream.main}
                      fontSize={55}
                    />
                    <div
                      style={{
                        textAlign: "center",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      <HeadLine4
                        text={"Online Advance Train Seats Reservation"}
                        color={theme.palette.cream.main}
                        fontSize={25}
                      />
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} lg={4} md={12}>
                <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                  <div style={styles.images}>
                    <Avatar
                      alt="Research Image"
                      src="./images/logo.png"
                      style={{
                        marginTop: 20,
                        height: 230,
                        width: 230,
                        borderRadius: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        objectFit: "contain",
                      }}
                      variant="rounded"
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      alignSelf: "center",
                      marginTop: -20,
                    }}
                  >
                    <HeadLine3
                      text={"Login to your account"}
                      fontWeight={"bold"}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  >
                    <ParagraphBold
                      text={"Invalid Credentials!"}
                      color={theme.palette.error.main}
                    />
                  </div>
                  <div style={styles.input}>
                    <InputField
                      id={"nic"}
                      label={"NIC"}
                      type={"text"}
                      placeholder={"Enter NIC Number"}
                      width={400}
                      name="nic"
                      onChange={(e) => {}}
                    />
                  </div>

                  <div style={styles.passwordInput}>
                    <PasswordInputField
                      label={"Password"}
                      placeholder={"Enter Password"}
                      width={400}
                      name="password"
                      onChange={(e) => {}}
                    />
                  </div>

                  <div style={styles.link}>
                    <Link
                      underline="always"
                      fontSize={16}
                      fontWeight={600}
                      color={theme.palette.blue.main}
                      onClick={() => {}}
                    >
                      {"Forgot Password?"}
                    </Link>
                  </div>

                  <div style={styles.button}>
                    <ContainedButton
                    onClick={handleClick}
                      title={"Login"}
                      backgroundColor={theme.palette.primary.main}
                    />
                  </div>
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
    marginTop: 40,
    display: "flex",
    marginBottom: 20,
    justifyContent: "center",
  },

  link: {
    marginTop: 30,
    display: "flex",
    marginRight: 35,
    justifyContent: "flex-end",
  },

  input: {
    marginTop: 40,
    display: "flex",
    justifyContent: "center",
  },

  passwordInput: {
    marginTop: 40,
    display: "flex",
    justifyContent: "center",
  },
};
