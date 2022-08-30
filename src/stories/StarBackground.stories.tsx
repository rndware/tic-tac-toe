import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StarBackground from "../components/star-background";

import "./story.css";

export default {
  title: "Core/Star Background",
  component: StarBackground,
  argTypes: {},
} as ComponentMeta<typeof StarBackground>;

const Template: ComponentStory<typeof StarBackground> = (_) => (
  <div className="story">
    <h2>Star Background...</h2>
    <StarBackground />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
