
import React from "react";
import * as ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import Home from "./components/Home";
import { shallow } from "enzyme";
import { act } from 'react-dom/test-utils';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});


describe("Home component", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  test("Home renders the text inside it", () => {
    const { getByText } = render(<Home />);
    const linkElement = getByText("Refresh Data!");
    expect(linkElement).toBeInTheDocument();
  });

  const wrapper = shallow(<Home />);

  test("render the click event of modal", () => {
    wrapper.find("#btns").find(".modal-btn").simulate("click");
    expect(wrapper.find(".modal-btn").text()).toBe('Show Chronological');
  });

});

it('can render and update a weather', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<Home />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('button');
  expect(label.textContent).toBe('Show Chronological');

  // Test second render and componentDidUpdate
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('Show Chronological');
});
