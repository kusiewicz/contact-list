import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { useContacts } from "./hooks/useContacts/useContacts";

jest.mock("./hooks/useContacts/useContacts");

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
      retry: jest.fn(),
    });
  });

  it("renders LoadingState when loading with no data", () => {
    jest.mocked(useContacts).mockReturnValue({
      contactsData: [],
      isLoading: true,
      error: null,
      fetchNextPage: jest.fn(),
      retry: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText("Loading contacts…")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Show more" })
    ).not.toBeInTheDocument();
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

    await userEvent.click(
      screen.getByRole("button", { name: /Jan Kowalski/ })
    );
    expect(screen.getByText("Selected contacts: 1")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /Jan Kowalski/ })
    );
    expect(screen.getByText("Selected contacts: 0")).toBeInTheDocument();
  });

  it("calls fetchNextPage when 'Show more' button is clicked", async () => {
    const fetchNextPage = jest.fn();
    jest.mocked(useContacts).mockReturnValue({
      contactsData: mockContacts,
      isLoading: false,
      error: null,
      fetchNextPage,
      retry: jest.fn(),
    });

    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "Show more" }));

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("renders ErrorMessage with Retry when initial load fails", () => {
    const retry = jest.fn();
    jest.mocked(useContacts).mockReturnValue({
      contactsData: [],
      isLoading: false,
      error: new Error(ERROR_LABEL),
      fetchNextPage: jest.fn(),
      retry,
    });

    render(<App />);

    expect(screen.getByRole("alert")).toHaveTextContent(ERROR_LABEL);
    expect(
      screen.getByRole("button", { name: "Try again" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Show more" })
    ).not.toBeInTheDocument();
  });

  it("calls retry when Retry button is clicked on initial load error", async () => {
    const retry = jest.fn();
    jest.mocked(useContacts).mockReturnValue({
      contactsData: [],
      isLoading: false,
      error: new Error(ERROR_LABEL),
      fetchNextPage: jest.fn(),
      retry,
    });

    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("shows Retry instead of Show more when pagination fails", () => {
    const retry = jest.fn();
    jest.mocked(useContacts).mockReturnValue({
      contactsData: mockContacts,
      isLoading: false,
      error: new Error(ERROR_LABEL),
      fetchNextPage: jest.fn(),
      retry,
    });

    render(<App />);

    expect(
      screen.getByText(mockContacts[0].firstNameLastName)
    ).toBeInTheDocument();
    expect(screen.getByText(ERROR_LABEL)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try again" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Show more" })
    ).not.toBeInTheDocument();
  });
});
