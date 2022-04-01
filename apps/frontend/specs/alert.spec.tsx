import { render } from "@testing-library/react";
import React from "react";

import Alert from "@frontend/components/Alert";

describe("Alert", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Alert title="Oh no!" />);
    expect(baseElement).toBeTruthy();
    expect(baseElement.outerHTML).toMatch("Oh no!");
  });
});
