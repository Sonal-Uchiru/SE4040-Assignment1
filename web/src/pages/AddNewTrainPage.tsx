import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import * as React from "react";
import ContainedButton from "../components/atoms/buttons/ContainedButton";
import InputField from "../components/atoms/inputFields/InputField";
import SelectField from "../components/atoms/selectField/SelectFieldAtom";
import Title from "../components/atoms/title/Title";
import TrainScheduleModalTable from "../components/organisms/tables/TrainScheduleModalTable";
import theme from "../theme/hooks/CreateTheme";

export default function AddNewTrainPage() {
  function handleClick() {
    console.log("clicked");
  }

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const options = [
    { value: "option1", label: "option1" },
    { value: "option2", label: "option2" },
    { value: "option3", label: "option3" },
    { value: "option4", label: "option4" },
  ];

  return (
    <>
      <Box sx={{ minHeight: 650 }}>
        <div>
          <Title backicon={false} titleName="Add New Train" />
          <div style={styles.images}>
            <Avatar
              alt="Research Image"
              src="./images/train.png"
              style={{
                marginTop: 20,
                width: 150,
                height: 150,
                objectFit: "contain",
              }}
              variant="rounded"
            />
          </div>

          <div>
            <Grid container spacing={1}>
              <Grid item xs={12} lg={6} md={6}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                  }}
                >
                  <InputField
                    id={"trainName"}
                    label={"Train Name"}
                    type={"text"}
                    placeholder={"Enter Train Name"}
                    width={450}
                    name="trainName"
                    onChange={(e) => {}}
                    required={true}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 45,
                  }}
                >
                  <InputField
                    id={"model"}
                    label={"Model"}
                    type={"text"}
                    placeholder={"Enter Model"}
                    width={450}
                    name="model"
                    onChange={(e) => {}}
                    required={true}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 45,
                  }}
                >
                  <InputField
                    id={"driverName"}
                    label={"Driver Name"}
                    type={"text"}
                    placeholder={"Enter Driver Name"}
                    width={450}
                    name="driverName"
                    onChange={(e) => {}}
                    required={true}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 45,
                  }}
                >
                  <InputField
                    id={"contactNumber"}
                    label={"Contact Number"}
                    type={"number"}
                    placeholder={"Enter Contact Number"}
                    width={450}
                    name="contactNumber"
                    onChange={(e) => {}}
                    required={true}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 45,
                  }}
                >
                  <InputField
                    id={"noOfSeats"}
                    label={"Number of Seats"}
                    type={"number"}
                    placeholder={"Enter Number of Seats"}
                    width={450}
                    name="noOfSeats"
                    onChange={(e) => {}}
                    required={true}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 45,
                  }}
                >
                  <SelectField
                    label={"Starting Station"}
                    placeholder={"Select Starting Station"}
                    options={options}
                    width={450}
                    name="startingStation"
                    onChange={(e) => {}}
                    required={true}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 45,
                  }}
                >
                  <SelectField
                    label={"Ending Station"}
                    placeholder={"Select Ending Station"}
                    options={options}
                    width={450}
                    name="endingStation"
                    onChange={(e) => {}}
                    required={true}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 45,
                  }}
                >
                  <SelectField
                    label={"Frequency"}
                    placeholder={"Select Frequency"}
                    options={options}
                    width={450}
                    name="frequency"
                    onChange={(e) => {}}
                    required={true}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 45,
                  }}
                >
                  <SelectField
                    label={"Departure Time"}
                    placeholder={"Select Departure Time"}
                    options={options}
                    width={450}
                    name="departureTime"
                    onChange={(e) => {}}
                    required={true}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 45,
                  }}
                >
                  <SelectField
                    label={"Arrival Time"}
                    placeholder={"Select Arrival Time"}
                    options={options}
                    width={450}
                    name="arrivalTime"
                    onChange={(e) => {}}
                    required={true}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 45,
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Return Trip"
                    />
                  </FormGroup>
                </div>
              </Grid>

              <Grid item xs={12} lg={6} md={6}>
                <div style={{ paddingRight: 20, paddingLeft: 20 }}>
                  <TrainScheduleModalTable />
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
                title={"Add Schedule"}
                color={theme.palette.white.main}
                backgroundColor={theme.palette.primary.main}
                width={150}
              />
            </div>
            <div
              className="btn-group"
              role="group"
              aria-label="Third group"
              style={styles.buttonGroup2}
            >
              <ContainedButton
                title={"Save"}
                color={theme.palette.white.main}
                backgroundColor={theme.palette.cream.main}
                onClick={handleClick}
                width={150}
              />
            </div>

            <div
              className="btn-group"
              role="group"
              aria-label="Third group"
              style={styles.buttonGroup2}
            >
              <ContainedButton
                title={"Back"}
                color={theme.palette.white.main}
                backgroundColor={theme.palette.neutral.main}
                onClick={handleClick}
                width={150}
              />
            </div>
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
    marginTop: 30,
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
