import { act, renderHook, waitFor } from "@testing-library/react";
import apiData from "src/api";
import { useContacts } from "./useContacts";

jest.mock("../../api");

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

  it("retry fetches first page when no data", async () => {
    const fetchError = new Error("Something went wrong");
    jest.mocked(apiData).mockRejectedValueOnce(fetchError);
    jest.mocked(apiData).mockResolvedValueOnce(mockFirstPage);

    const { result } = renderHook(() => useContacts());

    await waitFor(() => {
      expect(result.current.error).toEqual(fetchError);
    });

    await act(async () => {
      await result.current.retry();
    });

    expect(result.current.contactsData).toEqual(mockFirstPage);
    expect(result.current.error).toBeNull();
  });

  it("retry fetches next page when data exists", async () => {
    const fetchError = new Error("Network error");
    jest
      .mocked(apiData)
      .mockResolvedValueOnce(mockFirstPage)
      .mockRejectedValueOnce(fetchError)
      .mockResolvedValueOnce(mockSecondPage);

    const { result } = renderHook(() => useContacts());

    await waitFor(() => {
      expect(result.current.contactsData).toEqual(mockFirstPage);
    });

    await act(async () => {
      await result.current.fetchNextPage();
    });

    expect(result.current.error).toEqual(fetchError);

    await act(async () => {
      await result.current.retry();
    });

    expect(result.current.contactsData).toEqual([
      ...mockFirstPage,
      ...mockSecondPage,
    ]);
    expect(result.current.error).toBeNull();
  });
});
