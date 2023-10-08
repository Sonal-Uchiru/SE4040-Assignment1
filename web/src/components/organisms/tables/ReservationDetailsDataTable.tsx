import { Box, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import ReservationProtectedApi from "../../../api/exclusive/ReservationProtectedApi";
import { getDataArrayByJson } from "../../../utils/datatable/TransformData";
import { AxiosError } from "axios";

interface IProp {
  isDataUpdated: boolean;
}

class ReservationData {
  trainName: string;
  startingStation: string;
  endingStation: string;
  departureDate: string;
  arrivalTime: string;
  departureTime: string;
  noOfPassengers: string;
  perPersonPrice: string;

  constructor(
    trainName: string,
    startingStation: string,
    endingStation: string,
    departureDate: string,
    arrivalTime: string,
    departureTime: string,
    noOfPassengers: string,
    perPersonPrice: string
  ) {
    {
      this.trainName = trainName;
      this.startingStation = startingStation;
      this.endingStation = endingStation;
      this.departureDate = departureDate;
      this.arrivalTime = arrivalTime;
      this.departureTime = departureTime;
      this.noOfPassengers = noOfPassengers;
      this.perPersonPrice = perPersonPrice;
    }
  }
}

export default function ReservationDetailsDataTable({}: IProp) {
  const [reservations, setReservations] = React.useState<any[]>([]);
  const [dataTableReservations, setDataTableReservations] =
    React.useState<any>(null);

  React.useEffect(() => {
    ReservationProtectedApi.getListAsync()
      .then((res) => {
        console.log(res.data.items);
        const reservationList = res.data.items.map(
          (item: any) =>
            new ReservationData(
              item.trainName,
              item.startingStation,
              item.endingStation,
              item.departureDate,
              item.arrivalTime,
              item.departureTime,
              item.noOfPassengers,
              item.perPersonPrice
            )
        );
        setReservations(res.data.items);
        console.log(reservationList);
        setDataTableReservations(getDataArrayByJson(reservationList));
      })
      .catch((err) => {
        err as AxiosError;
        console.log(err);
      });
  }, []);

  const options: any = {
    responsive: "standard",
    rowsPerPageOptions: [5, 10, 15, 20],
    rowsPerPage: 10,

    onTableChange: (action: any, state: any) => {
      console.log(action);
      console.log(state);
    },
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [isPreview, setIsPreview] = React.useState(false);

  function handleClick() {
    console.log("clicked");
  }

  const columns = [
    "Train Name",
    "Departure Date",
    "Departure Time",
    "Arrival Time",
    "No of Seats Reserved",
    "Per Person Price (LKR.)",
    "Total Price (LKR.)",
    {
      name: "Action",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <div>
                <IconButton
                  onClick={() => {
                    handleClick();
                  }}
                >
                  <img
                    alt="Edit Icon"
                    src="./images/editing.png"
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </IconButton>
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    handleClick();
                  }}
                >
                  <img
                    alt="Edit Icon"
                    src="./images/multiply.png"
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </IconButton>
              </div>
            </div>
          );
        },
      },
    },
  ];

  return (
    <>
      <Box sx={styles.table}>
        {dataTableReservations && (
          <MUIDataTable
            title={"Reservation List"}
            data={dataTableReservations}
            columns={columns}
            options={options}
          />
        )}
      </Box>
    </>
  );
}

const styles = {
  table: {
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "40px",
    marginBottom: "10px",
  },
};
