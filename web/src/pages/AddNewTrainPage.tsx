import { Alert, Grid } from "@mui/material";
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
import TrainScheduleTable from "../components/organisms/tables/TrainScheduleTable";
import TrainProtectedApi from "../api/exclusive/TrainProtectedApi";
import { AxiosError } from "axios";

export default function AddNewTrainPage() {
  function handleClick() {
    console.log("clicked");
  }

  const [checked, setChecked] = React.useState(false);
  const [name, setTrainName] = React.useState("");
  const [model, setModel] = React.useState("");
  const [driverName, setDriverName] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");
  const [noOfSeats, setNoOfSeats] = React.useState("");
  const [startingStation, setStartingStation] = React.useState("");
  const [endingStation, setEndingStation] = React.useState("");
  const [frequencies, setFrequencies] = React.useState("");
  const [departureTime, setDepartureTime] = React.useState("");
  const [arrivalTime, setArrivalTime] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [schedules, setSchedules] = React.useState<any[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const stations = [
    { value: "AHUNGALLE", label: "AHUNGALLE" },
    { value: "BADULLA", label: "BADULLA" },
    { value: "BENTOTA", label: "BENTOTA" },
    { value: "KALUTARA", label: "KALUTARA" },
    { value: "COLOMBO - FORT", label: "COLOMBO - FORT" },
    { value: "GAPMPAHA", label: "GAPMPAHA" },
    { value: "YAGODA", label: "YAGODA" },
  ];

  const frequency = [
    { value: "Daily", label: "Daily" },
    { value: "Week-Ends", label: "Week-Ends" },
    { value: "Week-Days", label: "Week-Days" },
  ];

  const time = [
    { value: "6.00 AM", label: "06.00 AM" },
    { value: "08.00 AM", label: "08.00 AM" },
    { value: "10.55 AM", label: "10.55 AM" },
    { value: "02.05 PM", label: "02.05 PM" },
    { value: "04.05 PM", label: "04.05 PM" },
  ];

  const handleSave = () => {
    const trainData = {
      name,
      model,
      driverName,
      contactNumber: contactNumber.replace(/^0+/, ""),
      noOfSeats,
      price,
      startingStation,
      endingStation,
      frequencies,
      departureTime,
      arrivalTime,
      returnTrip: checked,
      schedules,
    };

    TrainProtectedApi.saveAsync(trainData)
      .then((res) => {
        console.log(res.data.items);
      })
      .catch((err) => {
        err as AxiosError;
        console.log(err);
      });
  };

  const addSchedule = () => {
    if (!frequencies || !arrivalTime || !departureTime || !price) {
      // Display an alert or error message to the user
      console.log(
        "Please fill out all required fields before adding a schedule."
      );
      return;
    }
    const newSchedule: any = {
      frequency: frequencies,
      arrivalTime: arrivalTime,
      departureTime: departureTime,
      isReturnTrip: checked,
      price: price,
    };
    setSchedules([...schedules, newSchedule]);
    console.log(schedules);
  };

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
                    placeholder={name ? name : "Enter Train Name"}
                    width={450}
                    name="trainName"
                    onChange={(e) => {
                      setTrainName(e.target.value);
                    }}
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
                    placeholder={model ? model : "Enter Model"}
                    width={450}
                    name="model"
                    onChange={(e) => {
                      setModel(e.target.value);
                    }}
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
                    placeholder={driverName ? driverName : "Enter Driver Name"}
                    width={450}
                    name="driverName"
                    onChange={(e) => {
                      setDriverName(e.target.value);
                    }}
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
                    placeholder={
                      contactNumber ? contactNumber : "Enter Contact Number"
                    }
                    width={450}
                    name="contactNumber"
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                    }}
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
                    placeholder={
                      noOfSeats ? noOfSeats : "Enter Number of Seats"
                    }
                    width={450}
                    name="noOfSeats"
                    onChange={(e) => {
                      setNoOfSeats(e.target.value);
                    }}
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
                    id={"price"}
                    label={"Price Per Person(LKR.)"}
                    type={"nmber"}
                    placeholder={price ? price : "Enter Price Per Person"}
                    width={450}
                    name="price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
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
                    placeholder={
                      startingStation
                        ? startingStation
                        : "Select Starting Station"
                    }
                    options={stations}
                    width={450}
                    name="startingStation"
                    onChange={(e) => {
                      setStartingStation(e.target.value);
                    }}
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
                    placeholder={
                      endingStation ? endingStation : "Select Ending Station"
                    }
                    options={stations}
                    width={450}
                    name="endingStation"
                    onChange={(e) => {
                      setEndingStation(e.target.value);
                    }}
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
                    placeholder={frequencies ? frequencies : "Select Frequency"}
                    options={frequency}
                    width={450}
                    name="frequency"
                    onChange={(e) => {
                      setFrequencies(e.target.value);
                    }}
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
                    placeholder={
                      departureTime ? departureTime : "Select Departure Time"
                    }
                    options={time}
                    width={450}
                    name="departureTime"
                    onChange={(e) => {
                      setDepartureTime(e.target.value);
                    }}
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
                    placeholder={
                      arrivalTime ? arrivalTime : "Select Arrival Time"
                    }
                    options={time}
                    width={450}
                    name="arrivalTime"
                    onChange={(e) => {
                      setArrivalTime(e.target.value);
                    }}
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
                  <TrainScheduleTable schedules={schedules} />
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
                onClick={addSchedule}
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
                onClick={handleSave}
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
