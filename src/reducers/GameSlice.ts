import { Mode, Winner, isGridIndex } from "../types/game";
import GameService from "../services/GameService";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import { appResetExclude } from "../actions";
import {
  markSquare,
  setGridData,
  setHighlight,
  setHighlightColor,
} from "./BoardSlice";
import { Player } from "../types/player";

export interface Game {
  mode: Mode;
  winner: Winner | null;
  winningPlayer: Player | null;
  playingMove: boolean;
}

const initialState: Game = {
  mode: Mode.Idle,
  winner: null,
  winningPlayer: null,
  playingMove: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: (state) => {
      state.mode = Mode.Playing;
    },
    end: (state) => {
      state.mode = Mode.Ended;
    },
    setPlayingMove(state, action: PayloadAction<boolean>) {
      state.playingMove = action.payload;
    },
    setWinner: (state, action: PayloadAction<Winner | null>) => {
      state.winner = action.payload;
    },
    setWinningPlayer: (state, action: PayloadAction<Player | null>) => {
      state.winningPlayer = action.payload;
    },
  },
});

export const { start, end, setWinner, setWinningPlayer, setPlayingMove } =
  gameSlice.actions;

// TO-DO: make not global)
let gameService: GameService;

export const startGame = (): AppThunk => (dispatch, getState) => {
  // app reducers reset
  dispatch(appResetExclude(["players", "settings"]));
  dispatch(start());

  const humanPlayer = getState().players.human!;
  const computerPlayer = getState().players.computer!;
  const difficulty = getState().settings.difficulty;

  gameService = new GameService(difficulty, humanPlayer, computerPlayer);
};

// TO-DO: reduce number of dispatch calls for optimisation
export const playMove = createAsyncThunk<void, number, { state: RootState }>(
  "game/playMove",
  async (index: number, { dispatch, getState }) => {
    const humanPlayer = getState().players.human;

    const humanMark = humanPlayer?.mark!;
    const markedGrid = getState().board.gridData;
    const mode = getState().game.mode;
    const playingMove = getState().game.playingMove;

    if (
      !isGridIndex(markedGrid[index]) ||
      mode !== Mode.Playing ||
      playingMove
    ) {
      return;
    }

    dispatch(setPlayingMove(true));
    dispatch(markSquare({ index, mark: humanMark }));
    const updatedMarkedGrid = getState().board.gridData;

    const finalMarkedGrid = await gameService.doComputerMove(updatedMarkedGrid);
    dispatch(setGridData(finalMarkedGrid));

    let winner = gameService.getWinner();

    if (winner) {
      dispatch(setWinner(winner));
      if (winner !== Winner.draw) {
        const winningPlayer = gameService.getWinningPlayer();

        dispatch(setWinningPlayer(winningPlayer));
        dispatch(setHighlightColor(winningPlayer?.color!));
        dispatch(setHighlight(gameService.getWinningLine(finalMarkedGrid)));
      }

      dispatch(end());
    }

    dispatch(setPlayingMove(false));
  }
);

export const getGameMode = (state: RootState): Mode => state.game.mode;

export default gameSlice.reducer;
