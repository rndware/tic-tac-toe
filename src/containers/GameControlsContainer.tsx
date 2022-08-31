import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import GameControls from "../components/game-controls";
import { getGameMode } from "../reducers/GameSlice";
import { undoInteraction } from "../reducers/GameSlice";
import { Mode } from "../types/game";

export default function GameControlsContainer() {
  const dispatch = useAppDispatch();

  return (
    <GameControls
      onUndo={(_) => dispatch(undoInteraction())}
      disabled={useAppSelector(getGameMode) === Mode.Ended}
    />
  );
}
