import React from "react";
import ReactLoading from "react-loading";
import COLORS from "../../../theme/styles/Colors";
import theme from "../../../theme/hooks/CreateTheme";

export default function ContentLoadingBar() {
  return (
    <div style={styles.container}>
      <ReactLoading
        type={"spin"}
        color={theme.palette.primary.main}
        height={100}
        width={100}
      />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginRight: 20,
    marginTop: 130,
    marginBottom: 20,
  },
};
