import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders message", () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("has role alert", () => {
    render(<ErrorMessage message="Error" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Error");
  });

  it("has error-message class", () => {
    render(<ErrorMessage message="Error" />);
    const el = screen.getByRole("alert");
    expect(el).toHaveClass("error-message");
  });
});
