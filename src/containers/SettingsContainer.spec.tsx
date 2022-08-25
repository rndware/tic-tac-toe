import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setDifficulty, getDifficulty } from "../reducers/SettingsSlice";
import SettingsForm from "../components/settings-form";

export default function SettingsContainer() {
  const dispatch = useAppDispatch();

  return (
    <SettingsForm
      difficulty={useAppSelector(getDifficulty)}
      onDifficultyChange={(e) => dispatch(setDifficulty(e.target.value))}
    />
  );
}
