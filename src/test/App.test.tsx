import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";

import App from "../App";
import { store } from "../redux/store";

test("search for console.log in the doc", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  /*
  const linkElement = screen.getByText(/to develope/i);
  expect(linkElement).toNotBeInTheDocument(); 
  */
});
