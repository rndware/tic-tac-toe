import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HighlightColors, Player } from "../types/player";
import GameOverBanner from "../components/game-over-banner";
import { Mode, Mark } from "../types/game";

import "./story.css";

export default {
  title: "Core/Game Over Banner",
  component: GameOverBanner,
  argTypes: {
    gameMode: {
      control: false,
    },
  },
} as ComponentMeta<typeof GameOverBanner>;

const Template: ComponentStory<typeof GameOverBanner> = (args) => (
  <div className="story">
    <h2>Game over banner fade in</h2>
    <GameOverBanner {...args} />
  </div>
);

const copy = {
  draw: "Game Over, Draw.",
  restart: "Restart",
  quit: "Quit",
};

export const Draw = Template.bind({});
Draw.args = {
  gameMode: Mode.Ended,
  copy,
};

const humanPlayer: Player = {
  name: "Mr. Human",
  age: 30,
  mark: Mark.x,
  color: HighlightColors.red,
};

const computerPlayer: Player = {
  name: "Mr. Computer",
  age: 30,
  mark: Mark.o,
  color: HighlightColors.red,
};

export const PlayerWins = Template.bind({});
PlayerWins.args = {
  copy: {
    ...copy,
    winner: `Game Over, "${humanPlayer.name}" has won.`,
  },
  gameMode: Mode.Ended,
  winningPlayer: humanPlayer,
};

export const ComputerWins = Template.bind({});
ComputerWins.args = {
  copy: {
    ...copy,
    winner: `Game Over, "${computerPlayer.name}" has won.`,
  },
  gameMode: Mode.Ended,
  winningPlayer: computerPlayer,
};
