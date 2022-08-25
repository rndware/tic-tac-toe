import React from "react";
import Typography from "@mui/material/Typography";
import { Mode } from "../../types/game";
import { Player } from "../../types/player";
import Button from "@mui/material/Button";

import styles from "./GameOverBanner.module.scss";

interface PlayerFormProps {
  gameMode: Mode;
  winningPlayer: Player | null;
  onRestart: () => void;
  onQuit: () => void;
}

function renderBannerText(winningPlayer: Player | null) {
  if (winningPlayer) {
    return `Game Over, "${winningPlayer.name}" has won.`;
  } else {
    return `Game Over, Draw.`;
  }
}

export default function GameOverBanner(props: PlayerFormProps) {
  return (
    <div
      data-testid="game-over"
      className={
        styles[
          `GameOverBanner${props.gameMode === Mode.Ended ? "--fadeIn" : ""}`
        ]
      }
    >
      <Typography variant="h3" component="h3">
        {renderBannerText(props.winningPlayer)}
      </Typography>
      <div className={styles.GameOverBanner__buttonContainer}>
        <Button onClick={props.onRestart} variant="contained">
          Restart
        </Button>
        <Button onClick={props.onQuit} color="secondary">
          Quit
        </Button>
      </div>
    </div>
  );
}
