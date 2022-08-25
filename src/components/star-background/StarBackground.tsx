import React from "react";
import styles from "./StarBackground.module.scss";

// TO-DO: use https://www.npmjs.com/package/classnames

/**
 * React wrapper for: https://codepen.io/alexitaylor/pen/RgxJwg
 */
export function StarBackground() {
  return (
    <div>
      <div className={styles["page-bg"]}></div>
      <div className={styles["animation-wrapper"]}>
        <div className={styles["particle"] + " " + styles["particle-1"]}></div>
        <div className={styles["particle"] + " " + styles["particle-2"]}></div>
        <div className={styles["particle"] + " " + styles["particle-3"]}></div>
        <div className={styles["particle"] + " " + styles["particle-4"]}></div>
      </div>
    </div>
  );
}
