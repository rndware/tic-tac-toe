import React from "react";
import { GridIndex, GridItem } from "../../types/game";
import { HighlightColors } from "../../types/player";
import MarkIcon from "../mark-icon";

import styles from "./BoardCell.module.scss";

interface BoardCellProps {
  id?: GridIndex;
  value: GridItem;
  onClick: (e: any) => void;
  isHighlighted?: boolean;
  highlightColor?: HighlightColors | null;
}

export default function BoardCell(props: BoardCellProps) {
  const fullId = props.id ? `board-cell-${props.id}` : undefined;
  return (
    <div
      id={fullId}
      className={
        props.isHighlighted
          ? styles[`BoardCell--highlighted-${props.highlightColor}`]
          : styles["BoardCell"]
      }
      data-testid={fullId}
      onClick={props.onClick}
    >
      <MarkIcon value={props.value} />
    </div>
  );
}
