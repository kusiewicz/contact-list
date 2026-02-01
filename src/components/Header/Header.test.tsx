import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders Contacts title", () => {
    render(<Header selectedCount={0} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Contacts"
    );
  });

  it("renders selected count", () => {
    render(<Header selectedCount={3} />);
    expect(screen.getByText("Selected contacts: 3")).toBeInTheDocument();
  });

  it("renders 0 when no contacts selected", () => {
    render(<Header selectedCount={0} />);
    expect(screen.getByText("Selected contacts: 0")).toBeInTheDocument();
  });

  it("has aria-live polite on counter", () => {
    render(<Header selectedCount={0} />);
    const counter = screen.getByText("Selected contacts: 0");
    expect(counter).toHaveAttribute("aria-live", "polite");
  });
});
