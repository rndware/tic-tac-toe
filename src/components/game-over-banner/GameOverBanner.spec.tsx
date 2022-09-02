import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Mark, Mode } from "../../types/game";
import { Player } from "../../types/player";
import { HighlightColors } from "../../types/player";
import GameOverBanner from "./GameOverBanner";

afterEach(() => {
  cleanup();
});

describe("GameOverBanner", () => {
  const player: Player = {
    name: "bar",
    age: 30,
    mark: Mark.x,
    color: HighlightColors.red,
  };

  const copy = {
    winner: `Game Over, "${player.name}" has won.`,
    draw: "Game Over, Draw.",
    restart: "Restart",
    quit: "Quit",
  };

  describe("the game has ended and the banner is shown to player", () => {
    it("should fade in", () => {
      const query = render(
        <GameOverBanner
          copy={copy}
          gameMode={Mode.Ended}
          winningPlayer={player}
          onRestart={() => {}}
          onQuit={() => {}}
        />
      );

      expect(query.getByTestId("game-over").className).toBe(
        "GameOverBanner GameOverBanner--fadeIn"
      );
    });

    it("should display game over win message with player name if won", () => {
      const query = render(
        <GameOverBanner
          copy={copy}
          gameMode={Mode.Ended}
          winningPlayer={player}
          onRestart={() => {}}
          onQuit={() => {}}
        />
      );

      expect(query.getByText(/Game Over,/).textContent).toBe(
        `Game Over, "${player.name}" has won.`
      );
    });

    it("should display game over draw message if a draw", () => {
      const query = render(
        <GameOverBanner
          copy={copy}
          gameMode={Mode.Ended}
          winningPlayer={null}
          onRestart={() => {}}
          onQuit={() => {}}
        />
      );

      expect(query.getByText(/Game Over,/).textContent).toBe(
        `Game Over, Draw.`
      );
    });

    it("should call restart when a player selects the restart button", () => {
      const handleClick = jest.fn();

      render(
        <GameOverBanner
          copy={copy}
          gameMode={Mode.Ended}
          winningPlayer={null}
          onRestart={handleClick}
          onQuit={() => {}}
        />
      );

      fireEvent.click(screen.getByText("Restart"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should call quit when a player selects the quit button", () => {
      const handleClick = jest.fn();

      render(
        <GameOverBanner
          copy={copy}
          gameMode={Mode.Ended}
          winningPlayer={null}
          onRestart={() => {}}
          onQuit={handleClick}
        />
      );

      fireEvent.click(screen.getByText("Quit"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
