import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useTranslation } from "react-i18next";
import { Mode } from "../types/game";
import { startGame, getWinningPlayer } from "../reducers/GameSlice";
import { getGameMode } from "../reducers/GameSlice";
import BoardContainer from "./BoardContainer";
import GameControlsContainer from "./GameControlsContainer";
import GameOverBanner from "../components/game-over-banner/GameOverBanner";

import styles from "./GameContainer.module.scss";

const GameContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const gameMode = useAppSelector(getGameMode);
  const winningPlayer = useAppSelector(getWinningPlayer);
  const gameOver = gameMode === Mode.Ended;

  // monitor 'dispatch' to avoid empty array warning
  useEffect(() => {
    dispatch(startGame());
  }, [dispatch]);

  return (
    <div className={styles.GameContainer}>
      <div
        className={
          styles[`BoardContainer__wrapper${gameOver ? "--blurred" : ""}`]
        }
      >
        <BoardContainer />
        <GameControlsContainer />
      </div>
      {gameOver && (
        <GameOverBanner
          copy={t("gamePage", {
            name: winningPlayer?.name,
            returnObjects: true,
          })}
          gameMode={gameMode}
          winningPlayer={winningPlayer}
          onRestart={() => dispatch(startGame())}
          onQuit={() => navigate("/")}
        />
      )}
    </div>
  );
};

export default GameContainer;
