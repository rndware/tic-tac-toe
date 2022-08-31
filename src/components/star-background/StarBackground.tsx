import React from "react";
import classNames from "classnames";
import { pure } from "recompose";
import styles from "./StarBackground.module.scss";

/**
 * React wrapper for: https://codepen.io/alexitaylor/pen/RgxJwg
 */

function renderParticles() {
  let arr = [];
  for (let i = 1; i <= 4; i++) {
    arr.push(
      <div
        key={`particle-${i}`}
        className={classNames([styles.particle, styles[`particle-${i}`]])}
      ></div>
    );
  }
  return arr;
}

function StarBackground() {
  return (
    <>
      <div className={styles["page-bg"]}></div>
      <div className={styles["animation-wrapper"]}>{renderParticles()}</div>
    </>
  );
}

export default pure(StarBackground);
