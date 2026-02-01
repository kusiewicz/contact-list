import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ContactProps } from "../../types";
import ContactsList from "./ContactsList";

const mockContacts: ContactProps[] = [
  {
    id: "1",
    firstNameLastName: "Jan Kowalski",
    jobTitle: "Developer",
    emailAddress: "jan@o2.com",
  },
  {
    id: "2",
    firstNameLastName: "Anna Nowak",
    jobTitle: "Designer",
    emailAddress: "anna@o2.com",
  },
];

describe("ContactsList", () => {
  it("renders all contacts as buttons", () => {
    render(
      <ContactsList
        contacts={mockContacts}
        selectedContactsIds={new Set()}
        onToggleSelect={jest.fn()}
      />
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: /Jan Kowalski/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Anna Nowak/i })
    ).toBeInTheDocument();
  });

  it("calls onToggleSelect with contact id when clicked", async () => {
    const onToggleSelect = jest.fn();
    render(
      <ContactsList
        contacts={mockContacts}
        selectedContactsIds={new Set()}
        onToggleSelect={onToggleSelect}
      />
    );

    await userEvent.click(
      screen.getByRole("button", { name: /Jan Kowalski/i })
    );

    expect(onToggleSelect).toHaveBeenCalledTimes(1);
    expect(onToggleSelect).toHaveBeenCalledWith("1");
  });
});
