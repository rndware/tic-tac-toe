import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  PayloadAction,
} from "@reduxjs/toolkit";
import boardReducer from "../reducers/BoardSlice";
import playersSlice from "../reducers/PlayersSlice";
import gameSlice from "../reducers/GameSlice";
import settingsReducer from "../reducers/SettingsSlice";

const combinedReducer = combineReducers({
  settings: settingsReducer,
  board: boardReducer,
  players: playersSlice,
  game: gameSlice,
});

function resetApp(
  state: RootState,
  action: PayloadAction<{ excludeReducers: string[] }>
): RootState {
  let newState: RootState = {};
  for (const reducer of action.payload.excludeReducers) {
    newState[reducer] = state[reducer];
  }
  return newState;
}

// TO-DO: resolve any type
const rootReducer: any = (state: RootState, action: PayloadAction<any>) => {
  if (action.type === "app/reset") {
    state = resetApp(state, action);
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
