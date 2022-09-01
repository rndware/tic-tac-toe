import React from "react";
import Typography from "@mui/material/Typography";
import SettingsContainer from "../../containers/SettingsContainer";
import styles from "./SettingsPage.module.scss";

const Settings = () => (
  <div className="SettingsPage">
    <Typography
      className={styles.SettingsPage__title}
      variant="h3"
      component="h3"
    >
      Settings
    </Typography>
    <div className={styles.SettingsPage__content}>
      <SettingsContainer />
    </div>
  </div>
);

export default Settings;
