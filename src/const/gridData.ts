import { GridItem } from "../types/game";

export const gridSize = 3;

export const rowIndexes: GridItem[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

export const columnIndexes: GridItem[][] = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

export const diagnalIndexes: GridItem[][] = [
  [0, 4, 8],
  [2, 4, 6],
];
