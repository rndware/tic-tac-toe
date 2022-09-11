import "@testing-library/jest-dom";
import { range } from "lodash";
import { gridSize } from "../const/gridData";
import { HighlightColors } from "../types/player";
import { cleanup } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";

import BoardContainer from "./BoardContainer";

afterEach(() => {
  cleanup();
});

describe("BoardContainer", () => {
  describe("display tic tac toe table grid component to player", () => {
    let query: any;

    beforeEach(() => {
      query = renderWithProviders(<BoardContainer />, {
        preloadedState: {
          board: {
            gridData: range(gridSize * gridSize),
            highlighted: [],
            highlightColor: HighlightColors.red,
          },
        },
      });
    });

    it("should render with correct number of rows", () => {
      const table = query.getByTestId("board-table");
      expect(table.getElementsByClassName("BoardRow").length).toBe(gridSize);
    });

    it("should render with correct number of cells", () => {
      const table = query.getByTestId("board-table");
      expect(table.getElementsByClassName("BoardCell").length).toBe(gridSize * gridSize);
    });
  });
});
