import * as React from "react";
import * as ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "./App";
import { shallow } from "enzyme";


describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

});

