import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarBackground from "../../components/star-background";
import styles from "./Intro.module.scss";

export default function Intro() {
  return (
    <div className={styles.IntroPage}>
      <StarBackground />
      <Typography
        className={styles.IntroPage__title}
        variant="h1"
        component="h1"
      >
        Tic Tac Toe
      </Typography>
      <div className={styles.IntroPage__content}>
        <Typography className={styles.IntroPage__desc} component="p">
          A long time ago in a galaxy far, far away...
        </Typography>
        <div className={styles.IntroPage__buttonContainer}>
          <Button variant="contained" component={Link} to={"/game"}>
            Start Game
          </Button>
          <Button color="secondary" component={Link} to={"/settings"}>
            Options
          </Button>
        </div>
      </div>
    </div>
  );
}
