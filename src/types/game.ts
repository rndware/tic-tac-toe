export enum Winner {
  huPlayer = "huPlayer",
  aiPlayer = "aiPlayer",
  draw = "draw",
}

export enum Mode {
  Idle,
  Playing,
  Ended,
}

export enum Mark {
  o = "o",
  x = "x",
}

export enum Difficulty {
  Easy = "Easy",
  Hard = "Hard",
  Normal = "Normal",
}

export enum Lang {
  en = "English",
  de = "German",
}

export type GridIndex = number;

export type GridItem = Mark | GridIndex;

export type GridData = GridItem[];

export type HighlightedIndexs = GridIndex[];

export function isGridIndex(gridItem: GridItem): gridItem is GridIndex {
  return typeof gridItem === "number";
}
