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

interface enumMap {
  [key: string]: string;
}

type Options = { [key: string]: string };

interface SettingsFormProps {
  copy: I18nCopy;
  difficulty: Difficulty;
  onDifficultyChange: (e: any) => void;
}

const renderSelectOptions = (
  key: string,
  enumOptions: enumMap,
  options: Options
) =>
  Object.keys(enumOptions).map((value: string) => (
    <MenuItem key={`${key}-options-item-${value}`} value={value}>
      {options[value.toString().toLowerCase()]}
    </MenuItem>
  ));

interface FormControlData {
  key: string;
  copy: I18nCopy;
  value: string;
  enum: enumMap;
  onChange: (e: any) => void;
  options: Options;
}

const renderFormControls = (formControls: FormControlData[]) => {
  return formControls.map((item: FormControlData) => (
    <div
      key={`form-control-item-${item.key}`}
      className={styles.SettingsForm__formControl}
    >
      <FormControl>
        <InputLabel id={`${item.key}-label`}>{item.copy.label}</InputLabel>
        <Select
          className={styles.Select}
          labelId={`${item.key}-label`}
          id={`${item.key}-select`}
          value={item.value}
          label={item.copy.label}
          onChange={item.onChange}
        >
          {renderSelectOptions(item.key, item.enum, item.options)}
        </Select>
      </FormControl>
    </div>
  ));
};

const SettingsForm = (props: SettingsFormProps) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const handleLangChange = (e: any) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const formControls: FormControlData[] = [
    {
      key: "difficulty",
      copy: props.copy.difficulty,
      value: props.difficulty,
      enum: Difficulty,
      onChange: props.onDifficultyChange,
      options: props.copy.difficulty.options,
    },
    {
      key: "lang",
      copy: props.copy.lang,
      value: language,
      enum: Lang,
      onChange: handleLangChange,
      options: props.copy.lang.options,
    },
  ];

  return (
    <form className={styles.SettingsForm} noValidate autoComplete="off">
      {renderFormControls(formControls)}
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
