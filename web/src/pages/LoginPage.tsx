import { Grid, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ContainedButton from "../components/atoms/buttons/ContainedButton";
import InputField from "../components/atoms/inputFields/InputField";
import PasswordInputField from "../components/atoms/inputFields/PasswordInputField";
import HeadLine1 from "../components/atoms/typographies/HeadLine1";
import HeadLine3 from "../components/atoms/typographies/HeadLine3";
import HeadLine4 from "../components/atoms/typographies/HeadLine4";
import ParagraphBold from "../components/atoms/typographies/ParagraphBold";
import theme from "../theme/hooks/CreateTheme";
import UserAuthenticationApi from "../api/exclusive/userApis/UserAuthenticationApi";
import BrowserLocalStorage from "../utils/localStorage/BrowserLocalStorage";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../types/enums/UserRoles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function LoginPage() {
  const navigate = useNavigate();
  const [nic, setNic] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  const handleNicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNic(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    setIsLoading(true);
    setLoginErrorMessage("");
    UserAuthenticationApi.loginAsync({ nic: nic, password: password })
      .then((res) => {
        setIsLoading(false);
        BrowserLocalStorage.SetAccessToken(res.data?.token);
        const userRole = BrowserLocalStorage.GetUserRole();

        switch (userRole) {
          case UserRoles.BackOfficer:
            navigate("/travelersDetails");
            break;
          case UserRoles.TravelAgent:
            navigate("/travelersDetails");
            break;
          default:
            setShowAlert(true);
        }
      })
      .catch((err: any) => {
        setIsLoading(false);
        setLoginErrorMessage(err?.response?.data?.message);
      });
  };

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
                      marginLeft: 20,
                      marginRight: 10,
                      objectFit: "contain",
                    }}
                    variant="rounded"
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "37%",
                      left: "33.5%",
                      transform: "translate(-50%, -50%)",
                      color: "white",

                      fontWeight: "bold",
                      background: "rgba(0, 0, 0, 0.5)",
                      padding: "10px 20px",
                      borderRadius: "5px",
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
                        marginTop: 30,
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
                  {loginErrorMessage && (
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
                  )}
                  <div style={styles.input}>
                    <InputField
                      id={"nic"}
                      label={"NIC"}
                      type={"text"}
                      placeholder={"Enter NIC Number"}
                      width={400}
                      name="nic"
                      value={nic}
                      onChange={(e) => {
                        handleNicChange(e);
                      }}
                    />
                  </div>

                  <div style={styles.passwordInput}>
                    <PasswordInputField
                      label={"Password"}
                      placeholder={"Enter Password"}
                      width={400}
                      name="password"
                      value={password}
                      onChange={(e) => {
                        handlePasswordChange(e);
                      }}
                    />
                  </div>

                  <div style={styles.button}>
                    <ContainedButton
                      onClick={handleClick}
                      title={"Login"}
                      backgroundColor={theme.palette.primary.main}
                      isLoading={isLoading}
                    />
                  </div>
                  {showAlert && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert
                        severity="error"
                        onClose={() => {
                          setShowAlert(false);
                        }}
                      >
                        You're not a valid user to access the website
                      </Alert>
                    </Stack>
                  )}
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
    marginTop: 80,
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
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
  },
};
