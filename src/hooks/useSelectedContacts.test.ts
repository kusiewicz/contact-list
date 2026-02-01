import { act, renderHook } from "@testing-library/react";
import type { ContactProps } from "../types";
import { useSelectedContacts } from "./useSelectedContacts";

const mockContacts: ContactProps[] = [
  {
    id: "1",
    firstNameLastName: "Jan Kowalski",
    jobTitle: "Developer",
    emailAddress: "jan@example.com",
  },
  {
    id: "2",
    firstNameLastName: "Anna Nowak",
    jobTitle: "Designer",
    emailAddress: "anna@example.com",
  },
];

describe("useSelectedContacts", () => {
  it("returns empty selected set initially", () => {
    const { result } = renderHook(() => useSelectedContacts(mockContacts));

    expect(result.current.selectedContactsIds.size).toBe(0);
    expect(result.current.orderedContacts).toEqual(mockContacts);
  });

  it("toggleContactSelect adds and removes id from selected set", () => {
    const { result } = renderHook(() => useSelectedContacts(mockContacts));

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
    const { result } = renderHook(() => useSelectedContacts(mockContacts));

    act(() => {
      result.current.toggleContactSelect("2");
    });

    expect(result.current.orderedContacts[0]).toEqual(mockContacts[1]);
    expect(result.current.orderedContacts[1]).toEqual(mockContacts[0]);
  });

  it("updates orderedContacts when contactsData changes", () => {
    const { result, rerender } = renderHook(
      ({ contacts }) => useSelectedContacts(contacts),
      { initialProps: { contacts: mockContacts } }
    );

    const newContacts: ContactProps[] = [
      ...mockContacts,
      {
        id: "3",
        firstNameLastName: "Piotr",
        jobTitle: "PM",
        emailAddress: "piotr@example.com",
      },
    ];
    rerender({ contacts: newContacts });

    expect(result.current.orderedContacts).toHaveLength(3);
    expect(result.current.orderedContacts[2].id).toBe("3");
  });
});
