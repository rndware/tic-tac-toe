import { HighlightColors, PlayerType } from "../types/player";
import { Mark } from "../types/game";
import historyReducer, {
  History,
  recordMarkHistory,
  revertToPreviousInteraction,
} from "./HistorySlice";

describe("history reducer", () => {
  const computerPlayer = {
    name: "Mr. Computer",
    mark: Mark.x,
    color: HighlightColors.red,
    playerType: PlayerType.computer,
  };

  const humanPlayer = {
    name: "Mr. Human",
    mark: Mark.o,
    color: HighlightColors.blue,
    playerType: PlayerType.human,
  };

  const moveOneSnapshot = [1, 2, 3, Mark.x, 5, 6, 7, 8];
  const moveTwoSnapshot = [1, 2, Mark.o, Mark.x, 5, 6, 7, 8];

  const initialState: History = {
    marksRecord: [],
  };

  it("should handle initial state", () => {
    expect(historyReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  describe("record mark history", () => {
    it("should record mark along with player", () => {
      expect(
        historyReducer(
          initialState,
          recordMarkHistory({
            player: computerPlayer,
            boardSnapshot: moveOneSnapshot,
          })
        ).marksRecord
      ).toEqual([
        {
          madeBy: computerPlayer,
          boardSnapshot: moveOneSnapshot,
        },
      ]);
    });

    it("should record mark without player", () => {
      expect(
        historyReducer(
          initialState,
          recordMarkHistory({
            player: undefined,
            boardSnapshot: moveOneSnapshot,
          })
        ).marksRecord
      ).toEqual([
        {
          boardSnapshot: moveOneSnapshot,
        },
      ]);
    });
  });

  it("should revert last interaction consisting of a humand and computer's last made marks", () => {
    const computerPlayer = {
      name: "Mr. Computer",
      mark: Mark.x,
      color: HighlightColors.red,
      playerType: PlayerType.computer,
    };

    const newState = {
      marksRecord: [
        {
          madeBy: computerPlayer,
          boardSnapshot: moveOneSnapshot,
        },
        {
          madeBy: humanPlayer,
          boardSnapshot: moveTwoSnapshot,
        },
      ],
    };

    expect(historyReducer(newState, revertToPreviousInteraction())).toEqual({
      marksRecord: [],
    });
  });
});
