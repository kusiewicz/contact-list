import { act, renderHook } from "@testing-library/react";
import { ContactProps } from "src/types";
import { useContactsSelection } from "./useContactsSelection";

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

describe("useSelectedContacts", () => {
  it("returns empty selected set initially", () => {
    const { result } = renderHook(() => useContactsSelection(mockContacts));

    expect(result.current.selectedContactsIds.size).toBe(0);
    expect(result.current.orderedContacts).toEqual(mockContacts);
  });

  it("toggleContactSelect adds and removes id from selected set", () => {
    const { result } = renderHook(() => useContactsSelection(mockContacts));

    act(() => {
      result.current.toggleContactSelect("1");
    });
    expect(result.current.selectedContactsIds.has("1")).toBe(true);
    expect(result.current.selectedContactsIds.size).toBe(1);

    act(() => {
      result.current.toggleContactSelect("1");
    });
    expect(result.current.selectedContactsIds.has("1")).toBe(false);
    expect(result.current.selectedContactsIds.size).toBe(0);
  });

  it("orderedContacts puts selected contacts first", () => {
    const { result } = renderHook(() => useContactsSelection(mockContacts));

    act(() => {
      result.current.toggleContactSelect("2");
    });

    expect(result.current.orderedContacts[0]).toEqual(mockContacts[1]);
    expect(result.current.orderedContacts[1]).toEqual(mockContacts[0]);
  });

  it("updates orderedContacts when contactsData changes", () => {
    const { result, rerender } = renderHook(
      ({ contacts }) => useContactsSelection(contacts),
      { initialProps: { contacts: mockContacts } }
    );

    const newContacts: ContactProps[] = [
      ...mockContacts,
      {
        id: "3",
        firstNameLastName: "Piotr",
        jobTitle: "PM",
        emailAddress: "piotr@o2.com",
      },
    ];
    rerender({ contacts: newContacts });

    expect(result.current.orderedContacts).toHaveLength(3);
    expect(result.current.orderedContacts[2].id).toBe("3");
  });
});
