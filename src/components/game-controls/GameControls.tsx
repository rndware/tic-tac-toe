import React from "react";
import Button from "@mui/material/Button";
import styles from "./GameControls.module.scss";
import { I18nCopy } from "../../types/app";

interface GameControlProps {
  copy: I18nCopy;
  onUndo: (e: any) => void;
  disabled: boolean;
}

const GameControls = (props: GameControlProps) => (
  <div className={styles.GameControls}>
    <Button
      onClick={props.onUndo}
      variant="contained"
      disabled={props.disabled}
    >
      {props.copy.undo}
    </Button>
  </div>
);

export default GameControls;
