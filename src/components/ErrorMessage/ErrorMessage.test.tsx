import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders an alert with the message", () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
  });

  it("does not render Retry button when onRetry is not provided", () => {
    render(<ErrorMessage message="Error" />);
    expect(
      screen.queryByRole("button", { name: /try again/i })
    ).not.toBeInTheDocument();
  });

  it("renders Retry button and calls onRetry when clicked", async () => {
    const onRetry = jest.fn();
    render(<ErrorMessage message="Error" onRetry={onRetry} />);

    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
