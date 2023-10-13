import Box from "@mui/material/Box";
import ContainedButton from "../components/atoms/buttons/ContainedButton";
import Title from "../components/atoms/title/Title";
import TrainDetailsDataTable from "../components/organisms/tables/TrainDetailsDataTable";
import theme from "../theme/hooks/CreateTheme";
import { useNavigate } from "react-router-dom";

export default function TrainDetailsPage() {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ minHeight: 650 }}>
        <div>
          <Title backicon={false} titleName="Train Details" />
          <div style={styles.button}>
            <ContainedButton
              onClick={() => navigate("/addNewTrain")}
              title={"Add New Train"}
              backgroundColor={theme.palette.darkBlue.main}
              height={60}
              width={200}
            />
          </div>
        </div>

        <div>
          <TrainDetailsDataTable isDataUpdated={false} />
        </div>
      </Box>
    </>
  );
}

const styles = {
  button: {
    display: "flex",
    justifyContent: "end",
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
};
