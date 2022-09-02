import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Mode } from "../types/game";
import { Player } from "../types/player";
import { I18nCopy } from "../types/app";
import { startGame, Game } from "../reducers/GameSlice";
import { RootState, AppDispatch } from "../app/store";
import BoardContainer from "./BoardContainer";
import GameControlsContainer from "./GameControlsContainer";
import GameOverBanner from "../components/game-over-banner/GameOverBanner";

import styles from "./GameContainer.module.scss";

interface GameContainerProps {
  // TO-DO: create better type for 't'
  t: (key: string, object: {}) => I18nCopy;
  startGame: () => void;
  winningPlayer: Player | null;
  gameMode: Mode;
  navigation: NavigateFunction;
}

type HookWrapperProps = Omit<GameContainerProps, "navigation" | "t">;

// Class component doesn't support hooks so use HOC
const HookWrapper = (props: HookWrapperProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return <GameContainer {...props} navigation={navigate} t={t} />;
};

class GameContainer extends React.Component<GameContainerProps> {
  componentDidMount(): void {
    this.props.startGame();
  }
  render = () => (
    <div className={styles.GameContainer}>
      <div
        className={
          styles[
            `BoardContainer__wrapper${
              this.props.gameMode === Mode.Ended ? "--blurred" : ""
            }`
          ]
        }
      >
        <BoardContainer />
        <GameControlsContainer />
      </div>
      {this.props.gameMode === Mode.Ended && (
        <GameOverBanner
          copy={this.props.t("gamePage", {
            name: this.props.winningPlayer?.name,
            returnObjects: true,
          })}
          gameMode={this.props.gameMode}
          winningPlayer={this.props.winningPlayer}
          onRestart={this.props.startGame}
          onQuit={() => this.props.navigation("/")}
        />
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    startGame: () => dispatch(startGame()),
  };
};

const mapStateToProps = (state: RootState) => {
  const game: Game = state.game;
  return { gameMode: game.mode, winningPlayer: game.winningPlayer };
};

export default connect(mapStateToProps, mapDispatchToProps)(HookWrapper);
