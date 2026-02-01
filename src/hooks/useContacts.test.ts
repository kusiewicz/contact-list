import { act, renderHook, waitFor } from "@testing-library/react";
import apiData from "../api";
import { useContacts } from "./useContacts";

jest.mock("../api");

const mockFirstPage = [
  {
    id: "1",
    firstNameLastName: "Jan Kowalski",
    jobTitle: "Developer",
    emailAddress: "jankowalski@o2.com",
  },
];

const mockSecondPage = [
  {
    id: "11",
    firstNameLastName: "Anna Nowak",
    jobTitle: "Designer",
    emailAddress: "annanowak@o2.com",
  },
];

describe("useContacts", () => {
  beforeEach(() => {
    jest.mocked(apiData).mockReset();
  });

  it("loads first page on mount", async () => {
    jest.mocked(apiData).mockResolvedValue(mockFirstPage);

    const { result } = renderHook(() => useContacts());

    await waitFor(() => {
      expect(result.current.contactsData).toEqual(mockFirstPage);
    });

    expect(result.current.error).toBeNull();
  });

  it("fetchNextPage appends next page to contacts", async () => {
    jest
      .mocked(apiData)
      .mockResolvedValueOnce(mockFirstPage)
      .mockResolvedValueOnce(mockSecondPage);

    const { result } = renderHook(() => useContacts());

    await waitFor(() => {
      expect(result.current.contactsData).toEqual(mockFirstPage);
    });

    await act(async () => {
      await result.current.fetchNextPage();
    });

    expect(result.current.contactsData).toEqual([
      ...mockFirstPage,
      ...mockSecondPage,
    ]);
  });

  it("sets error when first page fetch fails", async () => {
    const fetchError = new Error("Something went wrong");
    jest.mocked(apiData).mockRejectedValue(fetchError);

    const { result } = renderHook(() => useContacts());

    await waitFor(() => {
      expect(result.current.error).toEqual(fetchError);
    });

    expect(result.current.contactsData).toEqual([]);
  });

  it("sets error when fetchNextPage fails", async () => {
    const fetchError = new Error("Network error");
    jest
      .mocked(apiData)
      .mockResolvedValueOnce(mockFirstPage)
      .mockRejectedValueOnce(fetchError);

    const { result } = renderHook(() => useContacts());

    await waitFor(() => {
      expect(result.current.contactsData).toEqual(mockFirstPage);
    });

    await act(async () => {
      await result.current.fetchNextPage();
    });

    expect(result.current.error).toEqual(fetchError);
    expect(result.current.contactsData).toEqual(mockFirstPage);
  });
});
