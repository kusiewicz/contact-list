import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { useContacts } from "./hooks/useContacts";

jest.mock("./hooks/useContacts");

const mockContacts = [
  {
    id: "1",
    firstNameLastName: "Jan Kowalski",
    jobTitle: "Developer",
    emailAddress: "jan@example.com",
  },
];

const ERROR_LABEL = "Something went wrong";

describe("App", () => {
  beforeEach(() => {
    jest.mocked(useContacts).mockReturnValue({
      contactsData: mockContacts,
      isLoading: false,
      error: null,
      fetchNextPage: jest.fn(),
    });
  });

  it("renders Header with selected count and ContactsList with contacts", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Contacts"
    );
    expect(screen.getByText("Selected contacts: 0")).toBeInTheDocument();
    expect(
      screen.getByText(mockContacts[0].firstNameLastName)
    ).toBeInTheDocument();
  });

  it("updates selected count when contact is clicked", async () => {
    render(<App />);

    expect(screen.getByText("Selected contacts: 0")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("article"));
    expect(screen.getByText("Selected contacts: 1")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("article"));
    expect(screen.getByText("Selected contacts: 0")).toBeInTheDocument();
  });

  it("calls fetchNextPage when 'Show more' button is clicked", async () => {
    const fetchNextPage = jest.fn();
    jest.mocked(useContacts).mockReturnValue({
      contactsData: mockContacts,
      isLoading: false,
      error: null,
      fetchNextPage,
    });

    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "Show more" }));

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("renders ErrorMessage when useContacts returns error", () => {
    jest.mocked(useContacts).mockReturnValue({
      contactsData: [],
      isLoading: false,
      error: new Error(ERROR_LABEL),
      fetchNextPage: jest.fn(),
    });

    render(<App />);

    expect(screen.getByRole("alert")).toHaveTextContent(ERROR_LABEL);
  });
});
