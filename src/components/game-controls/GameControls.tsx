import React from "react";
import Button from "@mui/material/Button";
import styles from "./GameControls.module.scss";

interface GameControlProps {
  onUndo: (e: any) => void;
  disabled: boolean;
}

const GameControls = (props: GameControlProps) => {
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
};

export default React.memo(GameControls);
