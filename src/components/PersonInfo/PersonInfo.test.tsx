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
  it("renders name, job title and email", () => {
    render(<PersonInfo {...defaultProps} />);
    expect(screen.getByText(defaultProps.firstNameLastName)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.jobTitle)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.emailAddress)).toBeInTheDocument();
  });

  it("calls onClick with id when clicked", async () => {
    render(<PersonInfo {...defaultProps} />);
    await userEvent.click(screen.getByRole("article"));
    expect(defaultProps.onClick).toHaveBeenCalledWith(defaultProps.id);
  });

  it("has person-info--selected class when selected", () => {
    render(<PersonInfo {...defaultProps} isSelected={true} />);
    const article = screen.getByRole("article");
    expect(article).toHaveClass("person-info--selected");
  });

  it("does not have person-info--selected class when not selected", () => {
    render(<PersonInfo {...defaultProps} />);
    const article = screen.getByRole("article");
    expect(article).not.toHaveClass("person-info--selected");
  });
});
