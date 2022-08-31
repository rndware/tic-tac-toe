import React from "react";
import classNames from "classnames";
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

function BoardCell(props: BoardCellProps) {
  const fullId = props.id ? `board-cell-${props.id}` : undefined;
  return (
    <div
      id={fullId}
      className={classNames({
        [styles.BoardCell]: true,
        [styles[`BoardCell--highlighted-${props.highlightColor}`]]:
          props.isHighlighted,
      })}
      data-testid={fullId}
      onClick={props.onClick}
    >
      <MarkIcon value={props.value} />
    </div>
  );
}

export default React.memo(BoardCell);
