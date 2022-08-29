import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BoardCell from "../components/board-cell";
import { Mark } from "../types/game";
import { HighlightColors } from "../types/player";

import "./story.css";

export default {
  title: "Core/BoardCell",
  component: BoardCell,
  argTypes: {
    value: {
      options: [Mark.o, Mark.x, 1],
      control: { type: "select" },
    },
    highlightColor: {
      options: [HighlightColors.red, HighlightColors.blue],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof BoardCell>;

const Template: ComponentStory<typeof BoardCell> = (args) => (
  <div className="story">
    <h2>Content within a Table Cell</h2>
    <BoardCell {...args} />
  </div>
);

export const Blank = Template.bind({});
Blank.args = {
  id: 1,
  value: 1,
};

export const Cross = Template.bind({});
Cross.args = {
  id: 1,
  value: Mark.x,
};

export const Nought = Template.bind({});
Nought.args = {
  id: 1,
  value: Mark.o,
};

export const Highlighted = Template.bind({});
Highlighted.args = {
  id: 1,
  value: Mark.o,
  isHighlighted: true,
  highlightColor: HighlightColors.blue,
};
