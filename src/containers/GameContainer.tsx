import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { connect } from "react-redux";
import { Mode } from "../types/game";
import { Player } from "../types/player";
import { startGame, Game } from "../reducers/GameSlice";
import { RootState, AppDispatch } from "../app/store";
import BoardContainer from "./BoardContainer";
import GameControlsContainer from "./GameControlsContainer";
import GameOverBanner from "../components/game-over-banner/GameOverBanner";

import styles from "./GameContainer.module.scss";

interface GameContainerProps {
  startGame: () => void;
  winningPlayer: Player | null;
  gameMode: Mode;
  navigation: NavigateFunction;
}

type NavWrapperProps = Omit<GameContainerProps, "navigation">;

// GameContainer wrap with useNavigate hook
function NavWrapper(props: NavWrapperProps) {
  const navigate = useNavigate();

  return <GameContainer {...props} navigation={navigate} />;
}

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

function mapStateToProps(state: RootState) {
  const game: Game = state.game;
  return { gameMode: game.mode, winningPlayer: game.winningPlayer };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavWrapper);
