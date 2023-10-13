import { Box, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import ReservationProtectedApi from "../../../api/exclusive/ReservationProtectedApi";
import { getDataArrayByJson } from "../../../utils/datatable/TransformData";
import { AxiosError } from "axios";
import UpdateReservationModal from "../../modals/reservation/UpdateReservationModal";
import ContentLoadingBar from "../../atoms/Loadings/ContentLoadingBar";
import ErrorModal from "../../modals/ErrorModal";
import Snackbars from "../../atoms/snackBar/SnackBar";
interface IProp {
  isDataUpdated: boolean;
}

class ReservationData {
  trainName: string;
  departureDate: string;
  arrivalTime: string;
  departureTime: string;
  noOfPassengers: string;
  perPersonPrice: string;
  totalPrice: string;

  constructor(
    trainName: string,
    departureDate: string,
    arrivalTime: string,
    departureTime: string,
    noOfPassengers: string,
    perPersonPrice: string,
    totalPrice: string
  ) {
    {
      this.trainName = trainName;
      this.departureDate = departureDate;
      this.arrivalTime = arrivalTime;
      this.departureTime = departureTime;
      this.noOfPassengers = noOfPassengers;
      this.perPersonPrice = perPersonPrice;
      this.totalPrice = totalPrice;
    }
  }
}

export default function ReservationDetailsDataTable({}: IProp) {
  const [reservations, setReservations] = React.useState<any[]>([]);
  const [dataTableReservations, setDataTableReservations] =
    React.useState<any>(null);
  const [id, setId] = React.useState(null);
  const [selectedReservation, setSelectedReservation] = React.useState<any>({});
  const [isUpdateSuccess, setIsUpdateSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorModalVisibility, setErrorModalVisibility] = React.useState(false);
  const [showSnackBar, setShowSnackBar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    "success" | "error" | "info" | "warning"
  >("success");

  React.useEffect(() => {
    setErrorModalVisibility(false);
    ReservationProtectedApi.getListAsync()
      .then((res) => {
        console.log(res.data.items);
        const reservationList = res.data.items.map(
          (item: any) =>
            new ReservationData(
              item.trainName ? item.trainName : "Not Available",
              item.departureDate ? item.departureDate : "Not Available",
              item.departureTime ? item.departureTime : "Not Available",
              item.arrivalTime ? item.arrivalTime : "Not Available",
              item.noOfPassengers ? item.noOfPassengers : "Not Available",
              item.perPersonPrice ? item.perPersonPrice : "Not Available",
              `${item.noOfPassengers * item.perPersonPrice}`
                ? `${item.noOfPassengers * item.perPersonPrice}`
                : "Not Available"
            )
        );
        setReservations(res.data.items);
        setDataTableReservations(getDataArrayByJson(reservationList));
        setIsLoading(false);
      })
      .catch((err) => {
        err as AxiosError;
        setIsLoading(false);
        setErrorModalVisibility(true);
        console.log(err);
      });
  }, [isUpdateSuccess]);

  const options: any = {
    responsive: "standard",
    rowsPerPageOptions: [5, 10, 15, 20],
    rowsPerPage: 10,
    selectableRows: false,

    onTableChange: (action: any, state: any) => {
      console.log(action);
      console.log(state);
    },
  };

  const [isOpen, setIsOpen] = React.useState(false);

  function handleClick(reservationId: any, reservation: any) {
    setSelectedReservation(reservation);
    setIsOpen(!isOpen);
    setId(reservationId); // Set the selected item ID
  }

  const handleDeleteReservation = (resId: any) => {
    ReservationProtectedApi.deleteAsync(resId)
      .then((res) => {
        ReservationProtectedApi.getListAsync()
          .then((res) => {
            const updatedReservationList = res.data.items.map(
              (item: any) =>
                new ReservationData(
                  item.trainName ? item.trainName : "Not Available",
                  item.departureDate ? item.departureDate : "Not Available",
                  item.departureTime ? item.departureTime : "Not Available",
                  item.arrivalTime ? item.arrivalTime : "Not Available",
                  item.noOfPassengers ? item.noOfPassengers : "Not Available",
                  item.perPersonPrice ? item.perPersonPrice : "Not Available",
                  `${item.noOfPassengers * item.perPersonPrice}`
                    ? `${item.noOfPassengers * item.perPersonPrice}`
                    : "Not Available"
                )
            );
            // Update the state with the new list of customers.
            setReservations(res.data.items);
            setDataTableReservations(
              getDataArrayByJson(updatedReservationList)
            );
            setSnackbarMessage("Successfully deleted the reservation!🙂");
            setSnackbarSeverity("success");
            setShowSnackBar(true);
          })
          .catch((err) => {
            err as AxiosError;
            console.error(err);
          });
      })
      .catch((err) => {
        err as AxiosError;
        const error = err?.response?.data?.message;
        setSnackbarMessage(error);
        setSnackbarSeverity("error");
        setShowSnackBar(true);
      });
  };
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
          const reservationId = dataTableReservations[tableMeta.rowIndex][0];
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
                    handleClick(
                      reservationId,
                      reservations[tableMeta.rowIndex]
                    );
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
                {isOpen && id === reservationId && (
                  <UpdateReservationModal
                    handleCancel={() => {
                      handleClick(
                        reservationId,
                        reservations[tableMeta.rowIndex]
                      );
                    }}
                    handleSave={() => [
                      setIsUpdateSuccess(!isUpdateSuccess),
                      setIsOpen(!isOpen),
                      setSnackbarMessage("Successfully updated!🙂"),
                      setSnackbarSeverity("success"),
                      setShowSnackBar(true),
                    ]}
                    reservation={selectedReservation}
                    errorMessage={"Cannot Update Reservation Now"}
                  />
                )}
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    handleDeleteReservation(
                      reservations[tableMeta.rowIndex].id
                    );
                  }}
                >
                  <img
                    alt="Edit Icon"
                    src="./images/trash.png"
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
      {showSnackBar && (
        <div>
          <Snackbars
            message={snackbarMessage}
            severity={snackbarSeverity}
            vertical={"top"}
            horizontal={"right"}
            open={showSnackBar}
            onClose={() => setShowSnackBar(false)}
          />
        </div>
      )}
      {!isLoading ? (
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
      ) : (
        <ContentLoadingBar />
      )}

      {errorModalVisibility && (
        <ErrorModal handleCancel={() => setErrorModalVisibility(false)} />
      )}
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
