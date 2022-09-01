import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useTranslation } from "react-i18next";
import { setDifficulty, getDifficulty } from "../reducers/SettingsSlice";
import SettingsForm from "../components/settings-form";

const SettingsContainer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <SettingsForm
      copy={t("settingsPage", { returnObjects: true })}
      difficulty={useAppSelector(getDifficulty)}
      onDifficultyChange={(e: any) => dispatch(setDifficulty(e.target.value))}
    />
  );
};

export default SettingsContainer;
