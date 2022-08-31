import { Mode, Winner, isGridIndex, GridIndex } from "../types/game";
import GameService from "../services/GameService";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import { appReset } from "../actions";
import {
  getGridData,
  markSquare,
  setGridData,
  setHighlight,
  setHighlightColor,
} from "./BoardSlice";
import { Player } from "../types/player";
import {
  getLastBoardSnapshot,
  getMarksRecordCount,
  recordMarkHistory,
  revertToPreviousInteraction,
} from "./HistorySlice";
import { getHumanPlayer, getComputerPlayer } from "./PlayersSlice";
import { getDifficulty } from "./SettingsSlice";

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

// TO-DO: make not global
let gameService: GameService;

export const startGame = (): AppThunk => (dispatch, getState) => {
  dispatch(appReset({ excludeReducers: ["players", "settings"] }));
  dispatch(start());

  const state = getState();
  const humanPlayer = getHumanPlayer(state);
  const computerPlayer = getComputerPlayer(state);
  const difficulty = getDifficulty(state);

  // record the blank board that we can revert to later
  dispatch(
    recordMarkHistory({
      boardSnapshot: getGridData(state),
    })
  );

  gameService = new GameService(difficulty, humanPlayer, computerPlayer);
};

export const undoInteraction = (): AppThunk => (dispatch, getState) => {
  // keep blank board entry in move history
  if (getMarksRecordCount(getState()) > 1) {
    dispatch(revertToPreviousInteraction());
    dispatch(setGridData(getLastBoardSnapshot(getState())));
  }
};

// TO-DO: reduce number of dispatch calls for optimisation
export const playMove = createAsyncThunk<void, number, { state: RootState }>(
  "game/playMove",
  async (index: GridIndex, { dispatch, getState }) => {
    const firstState = getState();

    const humanPlayer = getHumanPlayer(firstState);
    const humanMark = humanPlayer?.mark!;

    const markedGrid = getGridData(firstState);
    const mode = getGameMode(firstState);
    const playingMove = getPlayingMove(firstState);

    if (
      !isGridIndex(markedGrid[index]) ||
      mode !== Mode.Playing ||
      playingMove
    ) {
      return;
    }

    dispatch(setPlayingMove(true));
    dispatch(markSquare({ index, mark: humanMark }));

    const secondState = getState();
    const updatedMarkedGrid = getGridData(secondState);

    dispatch(
      recordMarkHistory({
        player: humanPlayer,
        boardSnapshot: updatedMarkedGrid,
      })
    );

    const finalMarkedGrid = await gameService.doComputerMove(updatedMarkedGrid);
    dispatch(setGridData(finalMarkedGrid));

    dispatch(
      recordMarkHistory({
        player: humanPlayer,
        boardSnapshot: finalMarkedGrid,
      })
    );

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
export const getPlayingMove = (state: RootState): Mode =>
  state.game.playingMove;

export default gameSlice.reducer;
