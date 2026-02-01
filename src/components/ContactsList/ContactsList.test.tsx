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
  it("renders all contacts", () => {
    render(
      <ContactsList
        contacts={mockContacts}
        selectedContactsIds={new Set()}
        onToggleSelect={jest.fn()}
      />
    );
    expect(
      screen.getByText(mockContacts[0].firstNameLastName)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockContacts[1].firstNameLastName)
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("calls onToggleSelect with contact id when contact is clicked", async () => {
    const onToggleSelect = jest.fn();
    render(
      <ContactsList
        contacts={mockContacts}
        selectedContactsIds={new Set()}
        onToggleSelect={onToggleSelect}
      />
    );
    const articles = screen.getAllByRole("article");
    await userEvent.click(articles[0]);
    expect(onToggleSelect).toHaveBeenCalledWith(mockContacts[0].id);
  });

  it("has contacts__list class on list", () => {
    render(
      <ContactsList
        contacts={mockContacts}
        selectedContactsIds={new Set()}
        onToggleSelect={jest.fn()}
      />
    );
    const list = screen.getByRole("list");
    expect(list).toHaveClass("contacts__list");
  });
});
