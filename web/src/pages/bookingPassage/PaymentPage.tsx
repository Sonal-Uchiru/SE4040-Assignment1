import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Grid } from "@mui/material";
import Title from "../../components/atoms/title/Title";
import ResearchFindingsListDataTable from "../../components/organisms/tables/ResearchFindingsListDataTable";
import ContainedButton from "../../components/atoms/buttons/ContainedButton";
import theme from "../../theme/hooks/CreateTheme";
import OfficerAddNewResearchPaperModal from "../../components/modals/officer/OfficerAddNewResearchPaperModal";
import ResearchDisseminationProtectedApi from "../../api/exclusive/ResearchDisseminationProtectedApi";
import { uploadResearchPaperAsync } from "../../utils/firebase/UploadFile";
import Snackbar from "@mui/material/Snackbar";
import { AxiosError } from "axios";
import { t } from "i18next";
import ResearchDisseminationService from "../../api/services/ResearchDisseminationService";
import ErrorModal from "../../components/modals/ErrorModal";
import SuccessModal from "../../components/modals/SuccessModal";
import TravelersDetailsDataTable from "../../components/organisms/tables/TravelersDetailsDataTable";
import ReservationDetailsDataTable from "../../components/organisms/tables/ReservationDetailsDataTable";
import ReservationManagementTrainListDataTable from "../../components/organisms/tables/ReservationManagementTrainListDataTable";
import HeadLine2 from "../../components/atoms/typographies/HeadLine2";
import InputField from "../../components/atoms/inputFields/InputField";
import CalenderField from "../../components/atoms/inputFields/CalenderField";
import SelectField from "../../components/atoms/selectField/SelectFieldAtom";
import HeadLine4 from "../../components/atoms/typographies/HeadLine4";
import ParagraphBold from "../../components/atoms/typographies/ParagraphBold";
import HeadLine3 from "../../components/atoms/typographies/HeadLine3";

export default function PaymentPage() {
  function handleClick() {
    console.log("clicked");
  }

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
                            placeholder={"xxxx  xxxx  xxxx  xxxx"}
                            width={320}
                            name="cardNumber"
                            onChange={(e) => {}}
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
                            placeholder={"Enter Card Holder’s Name"}
                            width={320}
                            name="cardHolderName"
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
                            marginRight: 5,
                            marginTop: 10,
                          }}
                        >
                          <SelectField
                            label={"Expiry Month"}
                            placeholder={"Select Expiry Month"}
                            options={month}
                            width={320}
                            name="expiryMonth"
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
                            marginRight: 5,
                            marginTop: 10,
                          }}
                        >
                          <InputField
                            id={"cardHolderName"}
                            label={"Card Holder’s Name"}
                            type={"text"}
                            placeholder={"Enter Card Holder’s Name"}
                            width={320}
                            name="cardHolderName"
                            onChange={(e) => {}}
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
                            type={"text"}
                            placeholder={"Enter CVV"}
                            width={320}
                            name="cvv"
                            onChange={(e) => {}}
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
                            />
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
                              onClick={handleClick}
                              width={100}
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
                            <HeadLine3 text={"5"} fontSize={20} />
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
                            <HeadLine3 text={"900.00"} fontSize={20} />
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
                            <HeadLine3 text={"4500.00"} fontSize={25} />
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
