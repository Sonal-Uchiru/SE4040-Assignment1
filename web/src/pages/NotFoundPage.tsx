import * as React from "react";
import theme from "../theme/hooks/CreateTheme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HeadLine1 from "../components/atoms/typographies/HeadLine1";
import HeadLine3 from "../components/atoms/typographies/HeadLine3";
import ContainedButton from "../components/atoms/buttons/ContainedButton";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <Box sx={{ minHeight: 650 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Avatar
              alt="Cindy Baker"
              src="/images/404.jpg"
              sx={{
                width: "70%",
                height: "20%",
                borderRadius: 20,
              }}
              variant="rounded"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div
            style={{
              marginTop: 90,
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <HeadLine1 text={"404"} color={theme.palette.error.main} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <HeadLine1 text={"Page"} color={theme.palette.primary.main} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <HeadLine1 text={"Not Found"} color={theme.palette.primary.main} />
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <HeadLine3
              text={"We’re sorry, the page you"}
              color={theme.palette.blue.main}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <HeadLine3
              text={"requested could not be"}
              color={theme.palette.blue.main}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <HeadLine3
              text={"found. please go back to"}
              color={theme.palette.blue.main}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <HeadLine3
              text={"the home page!"}
              color={theme.palette.blue.main}
            />
          </div>
          <div style={styles.button}>
            <ContainedButton
              width={220}
              title={"Go To Login Page"}
              color={theme.palette.white.main}
              backgroundColor={theme.palette.primary.main}
              onClick={handleClick}
              height={55}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

const styles = {
  button: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
};
