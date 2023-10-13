import * as React from "react";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import theme from "../../../theme/hooks/CreateTheme";
import ContainedButton from "../../atoms/buttons/ContainedButton";
import HeadLine4 from "../../atoms/typographies/HeadLine4";
import Paragraph from "../../atoms/typographies/Paragraph";
import ParagraphBold from "../../atoms/typographies/ParagraphBold";
import InputField from "../../atoms/inputFields/InputField";
import ReservationProtectedApi from "../../../api/exclusive/ReservationProtectedApi";
import CalenderField from "../../atoms/inputFields/CalenderField";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
interface IProps {
  handleCancel(): void;
  handleConfirm(): void;
  train: any;
}

export default function DisplaySummaryModal({
  handleCancel,
  handleConfirm,
  train,
}: IProps) {
  const navigate = useNavigate();
  const [noOfPassengers, setNoofPassengers] = React.useState("");
  const [departureDate, setDepartureDate] = React.useState<Dayjs | null>(
    dayjs("")
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const [errorMessageState, setErrorMessageState] = React.useState(false);

  const totalPrice = noOfPassengers
    ? (parseInt(noOfPassengers) * parseInt(train.price)).toString()
    : "0";
  const currentDate = new Date().toISOString();

  const handleConfirmBooking = () => {
    setIsLoading(true);
    if (totalPrice && noOfPassengers && departureDate) {
      const payload = {
        trainId: train.id,
        trainName: train.name,
        startingStation: train.startingStation,
        endingStation: train.endingStation,
        departureDate: departureDate?.format("YYYY-MM-DD"),
        arrivalTime: train.arrivalTime,
        departureTime: train.departureTime,
        noOfPassengers: noOfPassengers,
        perPersonPrice: train.price,
        totalPrice: totalPrice,
        reservationDate: currentDate,
      };
      console.log(payload);
      ReservationProtectedApi.saveAsync(payload)
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);

          navigate("/payment", {
            state: { noOfPassengers, totalPrice, price: train.price },
          });
        })
        .catch((err) => {
          const errorMessage = err?.response?.data?.message;
          setIsLoading(false);
        });
    } else {
      setErrorMessageState(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={true}>
          <Box sx={styles.box}>
            <div style={{ textAlign: "center", marginTop: -15 }}>
              <HeadLine4
                text={"Reservation Details"}
                color={theme.palette.primary.main}
              />
            </div>
            <div style={styles.images}>
              <Avatar
                alt="Research Image"
                src="./images/train2.png"
                style={{
                  marginTop: 20,
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                }}
                variant="rounded"
              />
            </div>

            {/* row 1 */}

            <div>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginRight: 30, marginTop: 15 }}>
                    <ParagraphBold
                      text={"Train Name"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>

                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginLeft: 30, marginTop: 15 }}>
                    <Paragraph
                      text={train?.name ? train.name : "Not Available"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* row 2 */}

            <div>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginRight: 30, marginTop: 15 }}>
                    <ParagraphBold
                      text={"Starting Station"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>

                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginLeft: 30, marginTop: 15 }}>
                    <Paragraph
                      text={
                        train?.startingStation
                          ? train.startingStation
                          : "Not Available"
                      }
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* row 3 */}

            <div>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginRight: 30, marginTop: 15 }}>
                    <ParagraphBold
                      text={"Ending Station"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>

                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginLeft: 30, marginTop: 15 }}>
                    <Paragraph
                      text={
                        train?.endingStation
                          ? train.endingStation
                          : "Not Available"
                      }
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* row 4 */}

            <div>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginRight: 30, marginTop: 15 }}>
                    <ParagraphBold
                      text={"Arrival Time"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>

                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginLeft: 30, marginTop: 15 }}>
                    <Paragraph
                      text={
                        train?.arrivalTime ? train.arrivalTime : "Not Available"
                      }
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>

            <div>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginRight: 30, marginTop: 15 }}>
                    <ParagraphBold
                      text={"Price One Person (LKR.)"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>

                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginLeft: 30, marginTop: 15 }}>
                    <Paragraph
                      text={train?.price ? train.price : "Not Available"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",

                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <InputField
                id={"passengers"}
                label={"No of Passengers(Max 4)"}
                type={"number"}
                placeholder={"Enter Passenger Count (Max 4)"}
                width={370}
                size="small"
                value={noOfPassengers}
                name="passengers"
                onChange={(e) => {
                  const newValue = Math.min(parseInt(e.target.value), 4);

                  // Check if newValue is a valid number
                  if (!isNaN(newValue)) {
                    setNoofPassengers(newValue.toString());
                  } else {
                    // Handle the case where newValue is not a valid number
                    setNoofPassengers("0"); // Set to 0 or any default value you prefer
                  }
                }}
                required={true}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <CalenderField
                label={"Date To Be Reserved"}
                size="small"
                width={370}
                value={departureDate}
                onChange={(newValue: any) => {
                  setDepartureDate(newValue);
                }}
              />
            </div>

            {/* row 9 */}

            <div>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginRight: 30, marginTop: 15 }}>
                    <HeadLine4
                      text={"Total Price (LKR.)"}
                      color={theme.palette.primary.main}
                      fontSize={16}
                      fontWeight={"bold"}
                    />
                  </div>
                </Grid>

                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginLeft: 30, marginTop: 15 }}>
                    <HeadLine4
                      text={totalPrice}
                      color={theme.palette.primary.main}
                      fontSize={16}
                      fontWeight={"bold"}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            {errorMessageState && (
              <div
                style={{
                  textAlign: "center",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                <ParagraphBold
                  text={"Please Fill Out All Required Fields (*)"}
                  color={theme.palette.error.main}
                />
              </div>
            )}
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
                  title={"Confirm"}
                  color={theme.palette.white.main}
                  backgroundColor={theme.palette.primary.main}
                  width={100}
                  onClick={handleConfirmBooking}
                  isLoading={isLoading}
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
                  onClick={handleCancel}
                  width={100}
                />
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

const styles = {
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: theme.palette.white.main,
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    width: 450,
  },

  button: {
    marginTop: 20,
    marginBottom: -5,
    justifyContent: "center",
    alignSelf: "center",
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

  images: {
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    marginBottom: 10,
  },

  input: {
    marginTop: 40,
    marginBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
};
