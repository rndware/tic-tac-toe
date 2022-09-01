import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { I18nCopy } from "../../types/app";
import { Difficulty, Lang } from "../../types/game";

import styles from "./SettingsForm.module.scss";

interface SettingsFormProps {
  copy: I18nCopy;
  difficulty: Difficulty;
  onDifficultyChange: (e: any) => void;
}

// TO-DO: combine renderDifficultyOptions and renderLangOptions into one generic function
const renderDifficultyOptions = (options: { [key: string]: string }) =>
  (Object.keys(Difficulty) as Array<keyof typeof Difficulty>).map(
    (value: string) => (
      <MenuItem key={`difficulty-settings-item-${value}`} value={value}>
        {options[value.toLowerCase()]}
      </MenuItem>
    )
  );

const renderLangOptions = (options: { [key: string]: string }) =>
  (Object.keys(Lang) as Array<keyof typeof Lang>).map((value: string) => (
    <MenuItem key={`lang-settings-item-${value}`} value={value}>
      {options[value.toLowerCase()]}
    </MenuItem>
  ));

const SettingsForm = (props: SettingsFormProps) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const handleLangChange = (e: any) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  // TO-DO: create a generic FormControl rendering service to avoid duplicate code
  return (
    <form className={styles.SettingsForm} noValidate autoComplete="off">
      <FormControl className={styles.FormControl}>
        <InputLabel id="difficulty-setting-label">
          {props.copy.difficulty.label}
        </InputLabel>
        <Select
          className={styles.Select}
          labelId="difficulty-setting-label"
          id="difficulty-setting-select"
          value={props.difficulty}
          label="difficulty"
          onChange={props.onDifficultyChange}
        >
          {renderDifficultyOptions(props.copy.difficulty.options)}
        </Select>
      </FormControl>
      <FormControl className={styles.FormControl}>
        <InputLabel id="lang-setting-label">{props.copy.lang.label}</InputLabel>
        <Select
          className={styles.Select}
          labelId="lang-setting-label"
          id="lang-setting-select"
          value={language}
          label="lang"
          onChange={handleLangChange}
        >
          {renderLangOptions(props.copy.lang.options)}
        </Select>
      </FormControl>
      <div className={styles.SettingsForm__controls}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          component={Link}
          to={"/"}
        >
          {props.copy.done}
        </Button>
      </div>
    </form>
  );
};

export default React.memo(SettingsForm);
