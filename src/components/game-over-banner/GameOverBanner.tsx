import React from "react";
import { pure } from "recompose";
import Typography from "@mui/material/Typography";
import classNames from "classnames";
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

function GameOverBanner(props: PlayerFormProps) {
  return (
    <div
      data-testid="game-over"
      className={classNames({
        [styles.GameOverBanner]: true,
        [styles["GameOverBanner--fadeIn"]]: props.gameMode === Mode.Ended,
      })}
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

export default pure(GameOverBanner);
