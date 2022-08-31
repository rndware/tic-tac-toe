import React from "react";
import Button from "@mui/material/Button";
import { pure } from "recompose";
import styles from "./GameControls.module.scss";

function GameControls(props: { onUndo: (e: any) => void; disabled: boolean }) {
  return (
    <div className={styles.GameControls}>
      <Button
        onClick={props.onUndo}
        variant="contained"
        disabled={props.disabled}
      >
        Undo
      </Button>
    </div>
  );
}

export default pure(GameControls);
