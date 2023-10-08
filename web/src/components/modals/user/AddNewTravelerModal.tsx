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
import ParagraphBold from "../../atoms/typographies/ParagraphBold";

interface IProps {
  handleCancel(): void;
  handleSave(values: any): void;
}

export default function AddNewTravelerModal({
  handleCancel,
  handleSave,
}: IProps) {
  const [nic, setNic] = React.useState("");

  const handleAddNewTravler = () => {
    const travelerData = {
      nic,
      password: nic,
      role: 3,
    };

    handleSave(travelerData);
    console.log(travelerData);
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
                text={"Add New Traveler"}
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
                id={"nic"}
                label={"NIC"}
                type={"text"}
                placeholder={"Enter NIC Number"}
                width={300}
                name="nic"
                value={nic}
                onChange={(e) => {
                  setNic(e.target.value);
                }}
                required={true}
              />
            </div>

            <div style={{ marginTop: 40, textAlign: "center" }}>
              <ParagraphBold
                text={"Initially, password will same as the NIC number."}
                color={theme.palette.primary.main}
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
                  title={"Add"}
                  color={theme.palette.white.main}
                  backgroundColor={theme.palette.primary.main}
                  width={100}
                  onClick={handleAddNewTravler}
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
