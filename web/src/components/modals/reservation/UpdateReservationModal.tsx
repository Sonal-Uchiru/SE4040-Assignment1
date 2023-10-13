import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import theme from "../../../theme/hooks/CreateTheme";
import ContainedButton from "../../atoms/buttons/ContainedButton";
import InputField from "../../atoms/inputFields/InputField";
import HeadLine4 from "../../atoms/typographies/HeadLine4";
import ReservationProtectedApi from "../../../api/exclusive/ReservationProtectedApi";
import { AxiosError } from "axios";
import ParagraphBold from "../../atoms/typographies/ParagraphBold";

interface IProps {
  handleCancel(): void;
  handleSave(): void;
  reservation: any;
  errorMessage: string;
}

export default function UpdateReservationModal({
  handleCancel,
  handleSave,
  reservation,
  errorMessage,
}: IProps) {
  const [passengerCount, setPassengerCount] = React.useState("");
  const [isEditTravelerSuccess, setIsEditTravelerSuccess] =
    React.useState(false);

  const [errorMessageState, setErrorMessageState] = React.useState(false);

  const handleSubmit = () => {
    console.log(reservation);
    const requestPayload = {
      noOfPassengers: passengerCount
        ? passengerCount
        : reservation?.noOfPassengers,
    };
    ReservationProtectedApi.updateAsync(requestPayload, reservation?.id)
      .then((res) => {
        console.log(res.data);
        handleSave();
        setIsEditTravelerSuccess(true);
      })
      .catch((err) => {
        err as AxiosError;
        console.log(err.response?.data);
        setErrorMessageState(true);
      });
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
                text={"Update Reserved Seats"}
                color={theme.palette.primary.main}
              />
            </div>
            <div style={styles.images}>
              <Avatar
                alt="Research Image"
                src="./images/cabin.png"
                style={{
                  marginTop: 20,
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                }}
                variant="rounded"
              />
            </div>

            {errorMessageState && (
              <div
                style={{
                  textAlign: "center",
                  alignSelf: "center",
                  marginTop: 20,
                }}
              >
                <ParagraphBold
                  text={"Cannot Update Reservation Now"}
                  color={theme.palette.error.main}
                />
              </div>
            )}

            <div style={styles.input}>
              <InputField
                id={"passengers"}
                label={"No of Passengers"}
                type={"text"}
                placeholder={"Enter Passenger Count"}
                width={300}
                name="passengers"
                defaultValue={
                  reservation?.noOfPassengers
                    ? reservation?.noOfPassengers
                    : passengerCount
                }
                onChange={(e) => {
                  setPassengerCount(e.target.value);
                }}
                required={true}
              />
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
                  title={"Update"}
                  color={theme.palette.white.main}
                  backgroundColor={theme.palette.primary.main}
                  width={100}
                  onClick={handleSubmit}
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
    maxWidth: 400,
  },

  button: {
    marginTop: 30,
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
