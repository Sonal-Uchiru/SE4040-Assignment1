import { Box, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import * as React from "react";
import UserProtectedApi from "../../../api/exclusive/userApis/UserProtectedApi";
import { AxiosError } from "axios";
import { getDataArrayByJson } from "../../../utils/datatable/TransformData";
import UpdateTravelersDetailsModal from "../../modals/user/UpdateTravelersDetailsModal";
import BrowserLocalStorage from "../../../utils/localStorage/BrowserLocalStorage";
import { UserRoles } from "../../../types/enums/UserRoles";
import ContentLoadingBar from "../../atoms/Loadings/ContentLoadingBar";
import ErrorModal from "../../modals/ErrorModal";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbars from "../../atoms/snackBar/SnackBar";

interface IProp {
  isDataUpdated: boolean;
}

class TravelersData {
  nic: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  isEnabled: boolean;

  constructor(
    nic: string,
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    isEnabled: boolean
  ) {
    this.nic = nic;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.mobile = mobile;
    this.isEnabled = isEnabled;
  }
}

export default function TravelersDetailsDataTable({ isDataUpdated }: IProp) {
  const [travelers, setTravelers] = React.useState<any[]>([]);
  const [dataTableTravelers, setDataTableTravelers] = React.useState<any>(null);
  const [id, setId] = React.useState(null);
  const [selectedTraveler, setSelectedTraveler] = React.useState<any>({});
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
    UserProtectedApi.getListAsync()
      .then((res) => {
        console.log(res.data.items);
        const travelerList = res.data.items.map(
          (item: any) =>
            new TravelersData(
              item.nic ? item.nic : "Not Available",
              item.firstName ? item.firstName : "Not Available",
              item.lastName ? item.lastName : "Not Available",
              item.email ? item.email : "Not Available",
              item.mobile ? item.mobile : "Not Available",
              item?.isEnabled ? item?.isEnabled : false
            )
        );
        setTravelers(res.data.items);
        setDataTableTravelers(getDataArrayByJson(travelerList));
        setIsLoading(false);
      })
      .catch((err) => {
        err as AxiosError;
        setIsLoading(false);
        setErrorModalVisibility(true);
        console.log(err);
      });
  }, [isUpdateSuccess, isDataUpdated]);

  const options: any = {
    responsive: "standard",
    rowsPerPageOptions: [5, 10, 15, 20],
    rowsPerPage: 10,
    selectableRows: false,

    onTableChange: (action: any, state: any) => {
      // console.log(action);
      // console.log(state);
    },
  };

  const [isOpen, setIsOpen] = React.useState(false);

  function handleClick(travelerId: any, traveler: any) {
    setSelectedTraveler(traveler);
    setIsOpen(!isOpen);
    setId(travelerId); // Set the selected item ID
  }

  const handleSwitchChange = (rowIndex: any) => {
    const updatedTraveler = { ...travelers[rowIndex] };
    updatedTraveler.isEnabled = !updatedTraveler.isEnabled;
    const updatedTravelers = [...travelers];
    updatedTravelers[rowIndex] = updatedTraveler;
    setTravelers(updatedTravelers);
    UserProtectedApi.toggleActivationAsync(updatedTraveler.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err as AxiosError;
        console.log(err);
      });
  };

  const handleDeleteUser = (userId: any) => {
    UserProtectedApi.deleteAsync(userId)
      .then((res) => {
        UserProtectedApi.getListAsync()
          .then((res) => {
            const updatedTravelerList = res.data.items.map(
              (item: any) =>
                new TravelersData(
                  item.nic ? item.nic : "Not Available",
                  item.firstName ? item.firstName : "Not Available",
                  item.lastName ? item.lastName : "Not Available",
                  item.email ? item.email : "Not Available",
                  item.mobile ? item.mobile : "Not Available",
                  item?.isEnabled ? item?.isEnabled : false
                )
            );
            // Update the state with the new list of customers.
            setTravelers(res.data.items);
            setDataTableTravelers(getDataArrayByJson(updatedTravelerList));
            setSnackbarMessage("Successfully deleted the traveler!🙂");
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
        console.error(err?.response?.data?.message);
      });
  };

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#03C988" : "#03C988",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#03C988",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#F34E4E" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const columns = [
    "NIC",
    "First Name",
    "Last Name",
    "Email",
    "Mobile Number",
    {
      name: "Action",
      options: {
        customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
          const travelerId = dataTableTravelers[tableMeta.rowIndex][0];
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
                    handleClick(travelerId, travelers[tableMeta.rowIndex]);
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
                {isOpen && id === travelerId && (
                  <UpdateTravelersDetailsModal
                    handleCancel={() => {
                      handleClick(travelerId, travelers[tableMeta.rowIndex]);
                    }}
                    handleSave={() => [
                      setIsUpdateSuccess(!isUpdateSuccess),
                      setIsOpen(!isOpen),
                      setSnackbarMessage("Successfully updated!🙂"),
                      setSnackbarSeverity("success"),
                      setShowSnackBar(true),
                    ]}
                    traveler={selectedTraveler}
                  />
                )}
              </div>
              {BrowserLocalStorage.GetUserRole() === UserRoles.BackOfficer && (
                <div>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        sx={{ marginLeft: 3, marginTop: 1, marginRight: -1 }}
                        checked={travelers[tableMeta.rowIndex].isEnabled}
                        onChange={() => handleSwitchChange(tableMeta.rowIndex)}
                        defaultChecked
                      />
                    }
                    label=""
                  />
                </div>
              )}
              {BrowserLocalStorage.GetUserRole() === UserRoles.BackOfficer && (
                <div>
                  <IconButton
                    onClick={() => {
                      handleDeleteUser(travelers[tableMeta.rowIndex].id);
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
              )}
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
          {dataTableTravelers && (
            <MUIDataTable
              title={"Travelers List"}
              data={dataTableTravelers}
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
    marginTop: "20px",
    marginBottom: "10px",
  },
};
