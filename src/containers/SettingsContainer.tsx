import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Difficulty, Lang } from "../types/game";
import { I18nCopy } from "../types/app";
import { useTranslation } from "react-i18next";
import { defaultLang } from "../const/i18n";
import { setDifficulty, getDifficulty } from "../reducers/SettingsSlice";
import SettingsForm, { FormControlData } from "../components/settings-form";

const SettingsContainer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(defaultLang);

  const handleLangChange = (e: any) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const settingsCopy: I18nCopy = t("settingsPage", { returnObjects: true });

  const formControls: FormControlData[] = [
    {
      key: "difficulty",
      copy: settingsCopy.difficulty,
      value: useAppSelector(getDifficulty),
      enum: Difficulty,
      onChange: (e: any) => dispatch(setDifficulty(e.target.value)),
      options: settingsCopy.difficulty.options,
    },
    {
      key: "lang",
      copy: settingsCopy.lang,
      value: language,
      enum: Lang,
      onChange: handleLangChange,
      options: settingsCopy.lang.options,
    },
  ];

  return <SettingsForm formControls={formControls} copy={settingsCopy} />;
};

export default SettingsContainer;
