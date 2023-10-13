import { Avatar, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ContainedButton from "../components/atoms/buttons/ContainedButton";
import InputField from "../components/atoms/inputFields/InputField";
import SelectField from "../components/atoms/selectField/SelectFieldAtom";
import Title from "../components/atoms/title/Title";
import HeadLine3 from "../components/atoms/typographies/HeadLine3";
import HeadLine4 from "../components/atoms/typographies/HeadLine4";
import ParagraphBold from "../components/atoms/typographies/ParagraphBold";
import theme from "../theme/hooks/CreateTheme";
import * as React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import PaymentSuccessModal from "../components/modals/PaymentSuccessModal";
import { set } from "lodash";
import Snackbars from "../components/atoms/snackBar/SnackBar";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentProp = location.state as any;
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardHolderName, setCardHolderName] = React.useState("");
  const [expiryMonth, setExpiryMonth] = React.useState("");
  const [expiryYear, setExpiryYear] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [showSnackBar, setShowSnackBar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [isLoading, setIsLoading] = React.useState(false);

  const month = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const year = [
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
    { value: "2029", label: "2029" },
    { value: "2030", label: "2030" },
    { value: "2031", label: "2031" },
    { value: "2032", label: "2032" },
    { value: "2033", label: "2033" },
    { value: "2034", label: "2034" },
  ];

  const handleClick = () => {
    setIsLoading(true);
    if (
      cardNumber === "" ||
      cardHolderName === "" ||
      expiryMonth === "" ||
      expiryYear === "" ||
      cvv === ""
    ) {
      setSnackbarMessage("Please Enter Valid Payment Details");
      setSnackbarSeverity("error");
      setShowSnackBar(true);
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
      setIsOpen(!isOpen);
    }
  };

  const handleNavigate = () => {
    setIsOpen(isOpen);
    navigate("/reservationManagement");
  };

  return (
    <>
      <Box sx={{ minHeight: 650 }}>
        <div style={{ marginTop: 30 }}>
          <Title backicon={false} titleName="Payment" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            <HeadLine4
              text={"Secure Payment"}
              color={theme.palette.primary.main}
            />
            <div>
              <Avatar
                alt="Research Image"
                src="./images/padlock2.png"
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 10,
                  marginTop: -5,
                  marginLeft: 10,
                  marginRight: 10,
                  objectFit: "contain",
                }}
                variant="rounded"
              />
            </div>
          </div>
          <div>
            <Grid container>
              <Grid item xs={12} lg={8} md={12}>
                <div style={styles.card}>
                  <div style={styles.images}>
                    <Avatar
                      alt="Research Image"
                      src="./images/credit-card.png"
                      style={{
                        marginTop: 20,
                        height: 230,
                        width: 350,
                        borderRadius: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        objectFit: "contain",
                      }}
                      variant="rounded"
                    />
                  </div>

                  {showSnackBar && (
                    <div>
                      <Snackbars
                        message={snackbarMessage}
                        severity={snackbarSeverity}
                        vertical={"top"}
                        horizontal={"center"}
                        open={showSnackBar}
                        onClose={() => setShowSnackBar(false)}
                      />
                    </div>
                  )}

                  {/* row 1 */}
                  <div>
                    <Grid container>
                      <Grid item xs={12} lg={6} md={6}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: 20,
                            marginRight: 5,
                            marginTop: 40,
                          }}
                        >
                          <InputField
                            id={"cardNumber"}
                            label={"Card Number"}
                            type={"number"}
                            placeholder={
                              cardNumber ? cardNumber : "xxxx  xxxx  xxxx  xxxx"
                            }
                            width={320}
                            name="cardNumber"
                            onChange={(e) => {
                              setCardNumber(e.target.value);
                            }}
                            required={true}
                          />
                        </div>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginRight: 10,
                            }}
                          >
                            <Avatar
                              alt="Research Image"
                              src="./images/visa (2).png"
                              style={{
                                marginTop: 20,
                                height: 35,
                                width: 35,
                                marginLeft: 70,

                                objectFit: "contain",
                              }}
                              variant="rounded"
                            />
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",

                              marginRight: 10,
                            }}
                          >
                            <Avatar
                              alt="Research Image"
                              src="./images/master.jpg"
                              style={{
                                marginTop: 20,
                                height: 35,
                                width: 35,
                                objectFit: "contain",
                              }}
                              variant="rounded"
                            />
                          </div>
                        </div>
                      </Grid>

                      <Grid item xs={12} lg={6} md={6}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: 20,
                            marginRight: 5,
                            marginTop: 40,
                          }}
                        >
                          <InputField
                            id={"cardHolderName"}
                            label={"Card Holder’s Name"}
                            type={"text"}
                            placeholder={
                              cardHolderName
                                ? cardHolderName
                                : "Enter Card Holder’s Name"
                            }
                            width={320}
                            name="cardHolderName"
                            onChange={(e) => {
                              setCardHolderName(e.target.value);
                            }}
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
                            marginRight: 5,
                          }}
                        >
                          <SelectField
                            label={"Expiry Month"}
                            placeholder={
                              expiryMonth ? expiryMonth : "Select Expiry Month"
                            }
                            options={month}
                            width={320}
                            name="expiryMonth"
                            onChange={(e) => {
                              setExpiryMonth(e.target.value);
                            }}
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
                            marginRight: 5,
                          }}
                        >
                          <SelectField
                            label={"Expiry Year"}
                            placeholder={
                              expiryYear ? expiryYear : "Select Expiry Year"
                            }
                            options={year}
                            width={320}
                            name="expiryYear"
                            onChange={(e) => {
                              setExpiryYear(e.target.value);
                            }}
                            required={true}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </div>

                  {/* row 3 */}

                  <div style={{ marginTop: 20 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} lg={6} md={6}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: 20,
                            marginRight: 5,
                            marginTop: 40,
                          }}
                        >
                          <InputField
                            id={"cvv"}
                            label={"CVV"}
                            type={"number"}
                            placeholder={cvv ? cvv : "Enter CVV"}
                            width={320}
                            name="cvv"
                            onChange={(e) => {
                              setCvv(e.target.value);
                            }}
                            required={true}
                          />
                        </div>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",

                              marginRight: 10,
                            }}
                          >
                            <Avatar
                              alt="Research Image"
                              src="./images/cvv.png"
                              style={{
                                marginTop: 20,
                                height: 35,
                                width: 35,
                                marginLeft: 70,

                                objectFit: "contain",
                              }}
                              variant="rounded"
                            />
                          </div>
                          <div
                            style={{
                              marginTop: 27,
                            }}
                          >
                            <ParagraphBold
                              text={"3 digits  on back of your card"}
                              color={theme.palette.primary.main}
                            />
                          </div>
                        </div>
                      </Grid>

                      <Grid item xs={12} lg={6} md={6}>
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
                              title={"Pay Now"}
                              color={theme.palette.white.main}
                              backgroundColor={theme.palette.primary.main}
                              width={100}
                              onClick={handleClick}
                            />

                            {isOpen && (
                              <PaymentSuccessModal
                                handleCancel={handleNavigate}
                              />
                            )}
                          </div>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Third group"
                            style={styles.buttonGroup2}
                          >
                            <ContainedButton
                              title={"Cancel"}
                              color={theme.palette.white.main}
                              backgroundColor={theme.palette.neutral.main}
                              onClick={() => {
                                navigate("/reservationManagement");
                              }}
                              width={100}
                              isLoading={isLoading}
                            />
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} lg={4} md={12}>
                <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                  <div style={styles.card2}>
                    <div style={{ textAlign: "center", marginTop: 20 }}>
                      <HeadLine4
                        text={"Price Details"}
                        fontSize={30}
                        color={theme.palette.primary.main}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: 20,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} lg={6} md={6}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",

                              marginTop: 10,
                            }}
                          >
                            <HeadLine3
                              text={"No of Passengers"}
                              fontSize={20}
                            />
                          </div>
                        </Grid>

                        <Grid item xs={12} lg={6} md={6}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",

                              marginTop: 10,
                            }}
                          >
                            <HeadLine3
                              text={paymentProp.noOfPassengers.toString()}
                              fontSize={20}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </div>

                    <div
                      style={{
                        marginTop: 20,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} lg={6} md={6}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginLeft: 20,
                              marginRight: 5,
                              marginTop: 10,
                            }}
                          >
                            <HeadLine3
                              text={"Price One Person (LKR.)"}
                              fontSize={20}
                            />
                          </div>
                        </Grid>

                        <Grid item xs={12} lg={6} md={6}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginLeft: 20,
                              marginRight: 5,
                              marginTop: 10,
                            }}
                          >
                            <HeadLine3
                              text={paymentProp.price.toString()}
                              fontSize={20}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </div>

                    <div
                      style={{
                        marginTop: 20,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={12} lg={6} md={6}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginLeft: 20,
                              marginTop: 10,
                            }}
                          >
                            <HeadLine3
                              text={"Total Price (LKR.)"}
                              fontSize={25}
                            />
                          </div>
                        </Grid>

                        <Grid item xs={12} lg={6} md={6}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",

                              marginTop: 10,
                            }}
                          >
                            <HeadLine3
                              text={paymentProp.totalPrice.toString()}
                              fontSize={25}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </div>
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

  card: {
    minHeight: 650,
    borderWidth: 2,
    maxWidth: 900,
    border: "solid",
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderColor: theme.palette.darkBlue.main,
    marginBottom: 20,
  },

  card2: {
    minHeight: 350,
    borderWidth: 2,
    maxWidth: 460,
    border: "solid",
    borderRadius: 20,
    marginTop: 20,
    marginRight: 10,
    borderColor: theme.palette.darkBlue.main,
    marginBottom: 20,
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
    marginTop: 40,
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
