import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Difficulty, Lang, isDifficultyEnumKey } from "../types/game";
import { SelectChangeEvent } from "@mui/material/Select";
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

  const handleLangChange = (e: SelectChangeEvent<string>) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    document.getElementsByTagName("html")[0].setAttribute("lang", language);
  }, [language]);

  const settingsCopy: I18nCopy = t("settingsPage", { returnObjects: true });

  const formControls: FormControlData[] = [
    {
      key: "difficulty",
      copy: settingsCopy.difficulty,
      value: useAppSelector(getDifficulty),
      enum: Difficulty,
      onChange: (e: SelectChangeEvent<string>) => {
        isDifficultyEnumKey(e.target.value) &&
          dispatch(setDifficulty(Difficulty[e.target.value]));
      },
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
