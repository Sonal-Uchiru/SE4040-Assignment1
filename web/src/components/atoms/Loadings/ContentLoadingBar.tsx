import React from "react";
import ReactLoading from "react-loading";
import COLORS from "../../../theme/styles/Colors";

export default function ContentLoadingBar() {
  return (
    <div style={styles.container}>
      <ReactLoading
        type={"spin"}
        color={COLORS.PRIMARY}
        height={120}
        width={120}
      />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginRight: 20,
    marginTop: 50,
    marginBottom: 20,
  },
};
