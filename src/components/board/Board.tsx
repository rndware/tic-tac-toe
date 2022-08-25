import React from "react";
import { HighlightColors } from "../../types/player";
import { GridIndex, GridData, GridItem } from "../../types/game";
import { chunkArray } from "../../utils";
import { gridSize } from "../../const/gridData";
import BoardCell from "../board-cell";

import styles from "./Board.module.scss";

interface BoardProps {
  disabled?: boolean;
  gridData: GridData;
  highlighted?: GridIndex[];
  highlightColor?: HighlightColors;
  onClick: (e: any, index: GridIndex) => void;
}

interface BoardRowProps {
  gridItems: GridData;
  indexRow: GridIndex;
  highlighted?: GridIndex[];
  highlightColor?: HighlightColors;
  onClick: (e: any, index: GridIndex) => void;
}

function BoardRow(props: BoardRowProps) {
  return (
    <tr className={"BoardRow"}>
      {props.gridItems.map((gridItem: GridItem, indexColumn: GridIndex) => {
        const flatIndex = props.indexRow * gridSize + indexColumn;
        return (
          <td key={`board-row-cell-${flatIndex}`} className="BoardRow__cell">
            <BoardCell
              id={flatIndex}
              value={gridItem}
              isHighlighted={props.highlighted?.includes(flatIndex)}
              highlightColor={props.highlightColor}
              onClick={(e: any) => props.onClick(e, flatIndex)}
            />
          </td>
        );
      })}
    </tr>
  );
}

const MemoWrapper = React.memo(
  BoardRow,
  (prevProps: BoardRowProps, nextProps: BoardRowProps) => {
    return prevProps.gridItems === nextProps.gridItems;
  }
);

export default function Board(props: BoardProps) {
  const chunckedArray: GridData[] = chunkArray(props.gridData, gridSize);

  return (
    <div className={"Board"}>
      <table
        data-testid="board-table"
        className={
          props.disabled
            ? styles["Board__table--disabled"]
            : styles["Board__table"]
        }
      >
        <tbody>
          {chunckedArray.map((gridItems: GridItem[], indexRow: GridIndex) => (
            <MemoWrapper
              gridItems={gridItems}
              indexRow={indexRow}
              highlighted={props.highlighted}
              highlightColor={props.highlightColor}
              onClick={(e: any, index: GridIndex) =>
                !props.disabled && props.onClick(e, index)
              }
              key={`row-item-${indexRow}`}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
