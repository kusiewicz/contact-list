import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoadMoreButton, {
  LOADING_LABEL,
  SHOW_MORE_LABEL,
} from "./LoadMoreButton";

describe("LoadMoreButton", () => {
  it("renders Show more when not loading", () => {
    render(<LoadMoreButton isLoading={false} onClick={() => {}} />);
    expect(screen.getByRole("button")).toHaveTextContent(SHOW_MORE_LABEL);
  });

  it("renders Loading... when loading", () => {
    render(<LoadMoreButton isLoading={true} onClick={() => {}} />);
    expect(screen.getByRole("button")).toHaveTextContent(LOADING_LABEL);
  });

  it("is disabled when loading", () => {
    render(<LoadMoreButton isLoading={true} onClick={() => {}} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is enabled when not loading", () => {
    render(<LoadMoreButton isLoading={false} onClick={() => {}} />);
    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("calls onClick when clicked", async () => {
    const onClick = jest.fn();
    render(<LoadMoreButton isLoading={false} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
