import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ContainedButton from "../components/atoms/buttons/ContainedButton";
import CalenderField from "../components/atoms/inputFields/CalenderField";
import InputField from "../components/atoms/inputFields/InputField";
import SelectField from "../components/atoms/selectField/SelectFieldAtom";
import Title from "../components/atoms/title/Title";
import HeadLine2 from "../components/atoms/typographies/HeadLine2";
import ReservationManagementTrainListDataTable from "../components/organisms/tables/ReservationManagementTrainListDataTable";
import theme from "../theme/hooks/CreateTheme";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";

export default function ReservationManagementPage() {
  const [startingStation, setStartingStation] = React.useState("");
  const [endingStation, setEndingStation] = React.useState("");
  const [noOfPassengers, setNoofPassengers] = React.useState("");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs(""));

  const stations = [
    { value: "AHUNGALLE", label: "AHUNGALLE" },
    { value: "BADULLA", label: "BADULLA" },
    { value: "BENTOTA", label: "BENTOTA" },
    { value: "KALUTARA", label: "KALUTARA" },
    { value: "COLOMBO - FORT", label: "COLOMBO - FORT" },
    { value: "GAPMPAHA", label: "GAPMPAHA" },
    { value: "YAGODA", label: "YAGODA" },
  ];

  function handleSearch() {
    // if (date) {
    //   const dayOfWeek = date.day(); // Get the day of the week (0 for Sunday, 1 for Monday, and so on)
    //   if (dayOfWeek === 0 || dayOfWeek === 6) {
    //     console.log(date.format("YYYY-MM-DD") + " is a weekend date.");
    //   } else {
    //     console.log(date.format("YYYY-MM-DD") + " is a weekday date.");
    //   }
    // } else {
    //   console.log("Please select a valid date.");
    // }
  }

  return (
    <>
      <Box sx={{ minHeight: 650 }}>
        <div style={{ marginTop: 30 }}>
          <Title backicon={false} titleName="Add Reservation" />
        </div>

        <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
          <div style={styles.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: theme.palette.primary.main,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                height: 100,
              }}
            >
              <div style={{ marginTop: 20 }}>
                <HeadLine2
                  text={"Book Your Seats"}
                  color={theme.palette.white.main}
                />
              </div>
            </div>

            {/* row 1 */}

            <div>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6} md={6}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 30,
                    }}
                  >
                    <SelectField
                      label={"Starting Station"}
                      placeholder={"Select Starting Station"}
                      options={stations}
                      width={250}
                      value={startingStation}
                      name="startingStation"
                      onChange={(e) => {
                        setStartingStation(e.target.value);
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
                      marginRight: 20,
                      marginTop: 30,
                    }}
                  >
                    <SelectField
                      label={"Ending Station"}
                      placeholder={"Select Ending Station"}
                      options={stations}
                      value={endingStation}
                      width={250}
                      name="endingStation"
                      onChange={(e) => {
                        setEndingStation(e.target.value);
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
                      marginRight: 20,
                      marginTop: 30,
                    }}
                  >
                    <InputField
                      id={"passengers"}
                      label={"No of Passengers"}
                      type={"number"}
                      placeholder={"Enter Passenger Count"}
                      width={250}
                      value={noOfPassengers}
                      name="passengers"
                      onChange={(e) => {
                        setNoofPassengers(e.target.value);
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
                      marginRight: 20,
                      marginTop: 30,
                    }}
                  >
                    <CalenderField
                      label={"Date"}
                      required={true}
                      value={date}
                      onChange={(newValue: any) => setDate(newValue)}
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
                  title={"Search"}
                  color={theme.palette.white.main}
                  backgroundColor={theme.palette.primary.main}
                  width={100}
                  onClick={handleSearch}
                />
              </div>
              <div
                className="btn-group"
                role="group"
                aria-label="Third group"
                style={styles.buttonGroup2}
              >
                <ContainedButton
                  title={"Reset"}
                  color={theme.palette.white.main}
                  backgroundColor={theme.palette.neutral.main}
                  onClick={handleSearch}
                  width={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <ReservationManagementTrainListDataTable isDataUpdated={false} />
        </div>
      </Box>
    </>
  );
}

const styles = {
  card: {
    minHeight: 400,
    borderWidth: 2,
    maxWidth: 800,
    border: "solid",
    borderRadius: 20,
    marginTop: 20,
    borderColor: theme.palette.darkBlue.main,
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
    marginTop: 50,
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
