import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { Difficulty } from "../../types/game";

import styles from "./SettingsForm.module.scss";

interface settingsFormProps {
  difficulty: Difficulty;
  onDifficultyChange: (e: any) => void;
}

function renderDifficultyOptions() {
  let arr = [];
  for (const option in Difficulty) {
    arr.push(<MenuItem value={option}>{option}</MenuItem>);
  }
  return arr;
}

function SettingsForm(props: settingsFormProps) {
  return (
    <form className={styles.SettingsForm} noValidate autoComplete="off">
      <FormControl>
        <InputLabel id="difficulty-setting-label">Game Difficulty</InputLabel>
        <Select
          className={styles.Select}
          labelId="difficulty-setting-label"
          id="difficulty-setting-select"
          value={props.difficulty}
          label="difficulty"
          onChange={props.onDifficultyChange}
        >
          {renderDifficultyOptions()}
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
          Done
        </Button>
      </div>
    </form>
  );
}

export default React.memo(SettingsForm);
