import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Difficulty, Lang } from "../types/game";
import SettingsForm from "../components/settings-form";

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

const copy = {
  title: "Settings",
  difficulty: {
    label: "Game Difficulty",
    options: {
      easy: "Easy",
      normal: "Normal",
      hard: "Hard",
    },
  },
  lang: {
    label: "Language",
    options: {
      en: "English",
      de: "German",
    },
  },
  done: "Done",
};

Default.args = {
  copy,
  formControls: [
    {
      key: "difficulty",
      copy: copy.difficulty,
      value: Difficulty.Easy,
      enum: Difficulty,
      onChange: (e: any) => {},
      options: copy.difficulty.options,
    },
    {
      key: "lang",
      copy: copy.lang,
      value: "en",
      enum: Lang,
      onChange: (e: any) => {},
      options: copy.lang.options,
    },
  ],
};
