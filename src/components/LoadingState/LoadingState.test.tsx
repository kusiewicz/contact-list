import { render, screen } from "@testing-library/react";
import LoadingState from "./LoadingState";

describe("LoadingState", () => {
  it("renders with correct role and text", () => {
    render(<LoadingState />);
    expect(screen.getByRole("status")).toHaveTextContent(/loading contacts/i);
  });
});
