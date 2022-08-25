import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Difficulty } from "../types/game";

export interface Settings {
  difficulty: Difficulty;
}

const initialState: Settings = {
  difficulty: Difficulty.Normal,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setDifficulty(state, action: PayloadAction<Difficulty>) {
      state.difficulty = action.payload;
    },
  },
});

export const { setDifficulty } = settingsSlice.actions;

export const getDifficulty = (state: RootState): Difficulty =>
  state.settings.difficulty!;

export default settingsSlice.reducer;
