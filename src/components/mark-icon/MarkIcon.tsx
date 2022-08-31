import React from "react";
import { pure } from "recompose";
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { GridItem, Mark } from "../../types/game";

import styles from "./MarkIcon.module.scss";

function getMaterialIcon(props: { value: GridItem }) {
  if (props.value === Mark.o) {
    return (
      <CircleOutlinedIcon
        aria-label="Nought symbol"
        aria-hidden={false}
        data-testid="mark-icon-nought"
        className="MarkIcon__nought"
      />
    );
  } else if (props.value === Mark.x) {
    return (
      <CloseIcon
        aria-label="Cross symbol"
        aria-hidden={false}
        data-testid="mark-icon-cross"
        className="MarkIcon__cross"
      />
    );
  } else {
    return <div data-testid="mark-icon-empty" className="MarkIcon__empty" />;
  }
}

function MarkIcon(props: { value: GridItem }) {
  return <div className={styles.MarkIcon}>{getMaterialIcon(props)}</div>;
}

export default pure(MarkIcon);
