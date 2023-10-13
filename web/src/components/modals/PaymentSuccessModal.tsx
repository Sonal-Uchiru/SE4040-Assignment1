import * as React from "react";
import { Formik, Form } from "formik";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import theme from "../../theme/hooks/CreateTheme";
import Avatar from "@mui/material/Avatar";
import ContainedButton from "../atoms/buttons/ContainedButton";

import HeadLine4 from "../atoms/typographies/HeadLine4";
import { AxiosError } from "axios";
import { ExtractValueAndLabel } from "../../utils/common/ValueLabelExtraction";
import InputField from "../atoms/inputFields/InputField";
import ParagraphBold from "../atoms/typographies/ParagraphBold";
import HeadLine3 from "../atoms/typographies/HeadLine3";

interface IProps {
  handleCancel(): void;
}

export default function PaymentSuccessModal({ handleCancel }: IProps) {
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
                fontSize={"22px"}
                text={"Your Payment is Successfully Completed !"}
                color={theme.palette.primary.main}
              />
            </div>
            <div style={styles.images}>
              <Avatar
                alt="Research Image"
                src="./images/checked.png"
                style={{
                  marginTop: 30,
                  width: 170,
                  height: 170,
                  objectFit: "contain",
                }}
                variant="rounded"
              />
            </div>

            <div
              style={{
                marginTop: 40,
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <HeadLine3
                fontSize={"25px"}
                text={"Thank You !"}
                color={theme.palette.cream.main}
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
                  title={"OK"}
                  color={theme.palette.white.main}
                  backgroundColor={theme.palette.primary.main}
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
