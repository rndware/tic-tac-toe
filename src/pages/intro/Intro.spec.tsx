import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Intro from "./Intro";

describe("Game page", () => {
  // TO-DO: get type
  let query: any;

  beforeEach(() => {
    query = render(
      <BrowserRouter>
        <Intro />
      </BrowserRouter>
    );
  });

  it("should render the title of the game", () => {
    expect(query.getByText("introPage.title")).toBeTruthy();
  });

  it("should render the description", () => {
    expect(query.getByText("introPage.description")).toBeTruthy();
  });

  it("should render the start game button", () => {
    expect(query.getByText("introPage.startGame")).toBeTruthy();
  });

  it("should render the options button", () => {
    expect(query.getByText("introPage.options")).toBeTruthy();
  });
});
