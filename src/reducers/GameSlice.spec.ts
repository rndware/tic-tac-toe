jest.mock("../services/GameService");
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import gameService from "../services/GameService";
import { Difficulty, Mode, Winner } from "../types/game";
import { HighlightColors, PlayerType } from "../types/player";
import { Mark } from "../types/game";

import gameReducer, {
  Game,
  start,
  end,
  setPlayingMove,
  setWinner,
  setWinningPlayer,
  startGame,
} from "./GameSlice";

describe("game reducer", () => {
  const initialState: Game = {
    mode: Mode.Idle,
    winner: null,
    winningPlayer: null,
    playingMove: false,
  };

  const humanPlayer = {
    name: "Mr. Human",
    age: 20,
    mark: Mark.o,
    color: HighlightColors.blue,
    playerType: PlayerType.human,
  };

  it("should handle initial state", () => {
    expect(gameReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should start game by settings correct status", () => {
    expect(gameReducer(initialState, start()).mode).toEqual(Mode.Playing);
  });

  it("should end game by settings correct status", () => {
    expect(gameReducer(initialState, end()).mode).toEqual(Mode.Ended);
  });

  it("should set lock when playing a move", () => {
    expect(gameReducer(initialState, setPlayingMove(true)).playingMove).toEqual(
      true
    );
  });

  it("should set winner of the game", () => {
    expect(
      gameReducer(initialState, setWinner(Winner.aiPlayer)).winner
    ).toEqual(Winner.aiPlayer);
  });

  it("should set winning player of the game", () => {
    expect(
      gameReducer(initialState, setWinningPlayer(humanPlayer)).winningPlayer
    ).toEqual(humanPlayer);
  });

  describe("startGame", () => {
    const computerPlayer = {
      name: "Mr. Computer",
      mark: Mark.x,
      color: HighlightColors.red,
      playerType: PlayerType.computer,
    };

    const initialState = {
      players: {
        human: humanPlayer,
        computer: computerPlayer,
      },
      settings: {
        difficulty: Difficulty.Easy,
      },
    };

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    const expectedActions = [
      {
        type: "app/reset",
        payload: { excludeReducers: ["players", "settings"] },
      },
      { type: "game/start" },
    ];

    let store: any;
    beforeEach(() => {
      store = mockStore({ ...initialState });
      store.dispatch(startGame());
    });

    it("should reset the local app state and set status to playing", () => {
      expect(store.getActions()).toEqual(expectedActions);
    });

    it("should start the game service with correct information", () => {
      expect(gameService).toHaveBeenCalledWith(
        Difficulty.Easy,
        humanPlayer,
        computerPlayer
      );
    });
  });

  //TO-DO: game/playMove reducer
});
