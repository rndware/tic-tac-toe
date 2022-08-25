import React from "react";
import Typography from "@mui/material/Typography";
import SettingsContainer from "../../containers/SettingsContainer.spec";
import styles from "./SettingsPage.module.scss";

export default function Settings() {
  return (
    <div className="SettingsPage">
      <Typography
        className={styles.SettingsPage__title}
        variant="h4"
        component="h4"
      >
        Settings
      </Typography>
      <div className={styles.SettingsPage__content}>
        <SettingsContainer />
      </div>
    </div>
  );
}
