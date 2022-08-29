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

export default function SettingsForm(props: settingsFormProps) {
  return (
    <FormControl className={styles.SettingsForm}>
      <InputLabel id="difficulty-setting-label">Game Difficulty</InputLabel>
      <Select
        className={styles.Select}
        labelId="difficulty-setting-label"
        id="difficulty-setting-select"
        value={props.difficulty}
        label="difficulty"
        onChange={props.onDifficultyChange}
      >
        <MenuItem value={Difficulty.Easy}>Easy</MenuItem>
        <MenuItem value={Difficulty.Normal}>Normal</MenuItem>
        <MenuItem value={Difficulty.Hard}>Hard</MenuItem>
      </Select>
      <div className={styles.SettingsForm__controls}>
        <Button color="primary" variant="contained" component={Link} to={"/"}>
          Done
        </Button>
      </div>
    </FormControl>
  );
}
