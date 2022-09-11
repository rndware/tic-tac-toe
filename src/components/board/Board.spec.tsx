import { render, cleanup, fireEvent } from "@testing-library/react";
import { range } from "lodash";
import "@testing-library/jest-dom";
import Board from "./Board";

afterEach(() => {
  cleanup();
});

describe("Board", () => {
  const gridData = range(6);
  const bardTestId = "board-table";
  const cellTestId = "board-cell-1";

  describe("game is active and enabled for the player", () => {
    it("should render an enabled lined board to the player", () => {
      const query = render(<Board gridData={gridData} onClick={() => {}} />);

      expect(query.getByTestId(bardTestId).className).toBe(
        "Board__table Board__table--lined"
      );
    });

    it("should not supppress click events made by the player", () => {
      const handleClick = jest.fn();
      const query = render(<Board gridData={gridData} onClick={handleClick} />);

      fireEvent.click(query.getByTestId(cellTestId));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("game is over and disabled for the player", () => {
    it("should render a disabled lined board to the player", () => {
      const query = render(
        <Board disabled={true} gridData={gridData} onClick={() => {}} />
      );

      expect(query.getByTestId(bardTestId).className).toBe(
        "Board__table Board__table--disabled Board__table--lined"
      );
    });

    it("should supppress click events made by the player", () => {
      const handleClick = jest.fn();
      const query = render(
        <Board disabled={true} gridData={gridData} onClick={handleClick} />
      );

      fireEvent.click(query.getByTestId(cellTestId));

      expect(handleClick).toHaveBeenCalledTimes(0);
    });
  });
});
