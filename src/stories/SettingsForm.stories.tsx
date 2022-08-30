import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SettingsForm from "../components/settings-form";
import { Difficulty } from "../types/game";

import "./story.css";

export default {
  title: "Core/Settings Form",
  component: SettingsForm,
  argTypes: {},
} as ComponentMeta<typeof SettingsForm>;

const Template: ComponentStory<typeof SettingsForm> = (args) => (
  <div className="story">
    <h2>Settings form input</h2>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<SettingsForm {...args} />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  difficulty: Difficulty.Easy,
};
