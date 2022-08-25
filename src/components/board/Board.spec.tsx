import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Board from "./Board";
import { range } from "../../utils";

afterEach(() => {
  cleanup();
});

describe("Board", () => {
  const gridData = range(6);
  const bardTestId = "board-table";
  const cellTestId = "board-cell-1";

  describe("game is active and enabled for the player", () => {
    it("should render an enabled board to the player", () => {
      const query = render(<Board gridData={gridData} onClick={() => {}} />);

      expect(query.getByTestId(bardTestId).className).toBe("Board__table");
    });

    it("should not supppress click events made by the player", () => {
      const handleClick = jest.fn();
      const query = render(<Board gridData={gridData} onClick={handleClick} />);

      fireEvent.click(query.getByTestId(cellTestId));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("game is over and disabled for the player", () => {
    it("should render a disabled board to the player", () => {
      const query = render(
        <Board disabled={true} gridData={gridData} onClick={() => {}} />
      );

      expect(query.getByTestId(bardTestId).className).toBe(
        "Board__table--disabled"
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
