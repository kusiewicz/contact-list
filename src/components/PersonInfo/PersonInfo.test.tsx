import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PersonInfo from "./PersonInfo";

const defaultProps = {
  id: "1",
  firstNameLastName: "Jan Kowalski",
  jobTitle: "Developer",
  emailAddress: "jankowalski@o2.pl",
  isSelected: false,
  onClick: jest.fn(),
};

describe("PersonInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders name, job title and email", () => {
    render(<PersonInfo {...defaultProps} />);

    expect(
      screen.getByText(defaultProps.firstNameLastName)
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.jobTitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.emailAddress)).toBeInTheDocument();
  });

  it("calls onClick with id when clicked", async () => {
    render(<PersonInfo {...defaultProps} />);

    await userEvent.click(
      screen.getByRole("button", { name: /Jan Kowalski/i })
    );

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClick).toHaveBeenCalledWith(defaultProps.id);
  });

  it("has selected aria-pressed state when selected", () => {
    render(<PersonInfo {...defaultProps} isSelected={true} />);

    expect(
      screen.getByRole("button", { name: /Jan Kowalski/i })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("has not-selected aria-pressed state when not selected", () => {
    render(<PersonInfo {...defaultProps} isSelected={false} />);

    expect(
      screen.getByRole("button", { name: /Jan Kowalski/i })
    ).toHaveAttribute("aria-pressed", "false");
  });
});
