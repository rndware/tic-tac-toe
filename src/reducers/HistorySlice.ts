import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";
import { RootState } from "../app/store";
import { GridData } from "../types/game";
import { Player } from "../types/player";

interface MarkRecord {
  madeBy?: Player | undefined;
  boardSnapshot: GridData;
}

export interface History {
  marksRecord: MarkRecord[];
}

const initialState: History = {
  marksRecord: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    recordMarkHistory: (
      state,
      action: PayloadAction<{
        player?: Player;
        boardSnapshot: GridData;
      }>
    ) => {
      state.marksRecord.push({
        ...(action.payload.player && {
          madeBy: cloneDeep(action.payload.player),
        }),
        boardSnapshot: cloneDeep(action.payload.boardSnapshot),
      });
    },
    revertToPreviousInteraction(state) {
      state.marksRecord.splice(-2);
    },
  },
});

export const { recordMarkHistory, revertToPreviousInteraction } =
  historySlice.actions;

export const getLastBoardSnapshot = (state: RootState): GridData =>
  state.history.marksRecord.slice(-1)[0].boardSnapshot;

export const getMarksRecordCount = (state: RootState): number =>
  state.history.marksRecord.length;

export default historySlice.reducer;
