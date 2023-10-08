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

interface IProps {
  handleCancel(): void;
  handleConfirm(): void;
}

export default function DisplaySummaryModal({
  handleCancel,
  handleConfirm,
}: IProps) {
  const options = [
    { value: "option1", label: "option1" },
    { value: "option2", label: "option2" },
    { value: "option3", label: "option3" },
    { value: "option4", label: "option4" },
  ];
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
                  width: 100,
                  height: 100,
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
                      text={"Train Name & No"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>

                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginLeft: 30, marginTop: 15 }}>
                    <Paragraph
                      text={"8096 Udarata Manike"}
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
                      text={"Colombo - Fort"}
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
                      text={"Badulla"}
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
                      text={"Departure Date"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>

                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginLeft: 30, marginTop: 15 }}>
                    <Paragraph
                      text={"2023 - 09 - 28"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* row 5 */}

            <div>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginRight: 30, marginTop: 15 }}>
                    <ParagraphBold
                      text={"Starting Time"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>

                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginLeft: 30, marginTop: 15 }}>
                    <Paragraph
                      text={"08:04 AM"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* row 6 */}

            <div>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginRight: 30, marginTop: 15 }}>
                    <ParagraphBold
                      text={"Ending Time"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>

                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginLeft: 30, marginTop: 15 }}>
                    <Paragraph
                      text={"05:51 PM"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* row 7 */}

            <div>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginRight: 30, marginTop: 15 }}>
                    <ParagraphBold
                      text={"No of Passengers"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>

                <Grid item xs={6} lg={6} md={6}>
                  <div style={{ marginLeft: 30, marginTop: 15 }}>
                    <Paragraph text={"05"} color={theme.palette.primary.main} />
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* row 8 */}

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
                      text={"900.00"}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Grid>
              </Grid>
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
                      text={"4500.00"}
                      color={theme.palette.primary.main}
                      fontSize={16}
                      fontWeight={"bold"}
                    />
                  </div>
                </Grid>
              </Grid>
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
                  title={"Confirm"}
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
    maxWidth: 600,
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
