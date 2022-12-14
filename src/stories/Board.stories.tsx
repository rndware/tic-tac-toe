import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { range } from "lodash";
import Board from "../components/board";
import { gridSize } from "../const/gridData";
import { Mark } from "../types/game";
import { GridItem } from "../types/grid";
import { diagnalIndexes } from "../const/gridData";
import { HighlightColors } from "../types/player";

import "./story.css";

export default {
  title: "Core/Board",
  component: Board,
  argTypes: {
    highlightColor: {
      options: [HighlightColors.red, HighlightColors.blue],
    },
  },
} as ComponentMeta<typeof Board>;

const Template: ComponentStory<typeof Board> = (args) => (
  <div className="story">
    <h2>Board representing the playing area</h2>
    <Board {...args} />
  </div>
);

export const Blank = Template.bind({});
Blank.args = {
  gridData: range(gridSize * gridSize),
};

const largeGridSize = 4;

export const BlankGridLarge = Template.bind({});

BlankGridLarge.args = {
  layout: "grid",
  gridSize: largeGridSize,
  gridData: range(largeGridSize * largeGridSize),
};

BlankGridLarge.argTypes = {
  layout: {
    control: false,
  },
};

let played: GridItem[] = range(gridSize * gridSize);
played[0] = Mark.x;
played[1] = Mark.o;
played[2] = Mark.x;

export const Played = Template.bind({});
Played.args = {
  gridData: played,
};

let winningLine: GridItem[] = range(gridSize * gridSize);
const line = diagnalIndexes[0];
for (let i = 0; i < line.length; i++) {
  winningLine[line[i]] = Mark.x;
}

export const WinningLine = Template.bind({});
WinningLine.args = {
  gridData: winningLine,
  highlightColor: HighlightColors.red,
  highlighted: line,
};
