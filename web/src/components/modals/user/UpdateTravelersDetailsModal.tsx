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
import UserProtectedApi from "../../../api/exclusive/userApis/UserProtectedApi";
import { AxiosError } from "axios";

interface IProps {
  handleCancel(): void;
  handleSave(): void;
  traveler: any;
}

export default function UpdateTravelersDetailsModal({
  handleCancel,
  handleSave,
  traveler,
}: IProps) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [isEditTravelerSuccess, setIsEditTravelerSuccess] =
    React.useState(false);
  const [showSnackBar, setShowSnackBar] = React.useState(false);

  const handleSubmit = () => {
    const requestPayload = {
      firstName: firstName ? firstName : traveler?.firstName,
      lastName: lastName ? lastName : traveler?.lastName,
      mobile: mobileNumber.replace(/^0+/, "")
        ? mobileNumber.replace(/^0+/, "")
        : traveler?.mobile,
    };

    UserProtectedApi.updateAsync(requestPayload, traveler?.id)
      .then((res) => {
        console.log(res.data);
        setIsEditTravelerSuccess(true);
        handleSave();
        setShowSnackBar(true);
      })
      .catch((err) => {
        err as AxiosError;
        console.log(err.response?.data);
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
                text={"Update Travelers Details"}
                color={theme.palette.primary.main}
              />
            </div>
            <div style={styles.images}>
              <Avatar
                alt="Research Image"
                src="./images/user.png"
                style={{
                  marginTop: 20,
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                }}
                variant="rounded"
              />
            </div>

            <div style={styles.input}>
              <InputField
                id={"firstName"}
                label={"First Name"}
                type={"text"}
                placeholder={"Enter First Name"}
                width={300}
                defaultValue={
                  traveler?.firstName ? traveler?.firstName : firstName
                }
                name="firstName"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required={true}
              />
            </div>

            <div style={styles.input}>
              <InputField
                id={"lastName"}
                label={"Last Name"}
                type={"text"}
                placeholder={"Enter Last Name"}
                width={300}
                defaultValue={
                  traveler?.lastName ? traveler?.lastName : lastName
                }
                name="lastName"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required={true}
              />
            </div>

            <div style={styles.input}>
              <InputField
                id={"mobileNumber"}
                label={"Mobile Number"}
                type={"text"}
                placeholder={"Enter Mobile Number"}
                width={300}
                defaultValue={
                  traveler?.mobile ? traveler?.mobile : mobileNumber
                }
                name="mobile Number"
                onChange={(e) => {
                  setMobileNumber(e.target.value);
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
    marginTop: 40,
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
