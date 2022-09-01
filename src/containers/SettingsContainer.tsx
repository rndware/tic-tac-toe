import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setDifficulty, getDifficulty } from "../reducers/SettingsSlice";
import SettingsForm from "../components/settings-form";

const SettingsContainer = () => {
  const dispatch = useAppDispatch();

  return (
    <SettingsForm
      difficulty={useAppSelector(getDifficulty)}
      onDifficultyChange={(e: any) => dispatch(setDifficulty(e.target.value))}
    />
  );
};

export default SettingsContainer;