import { useCallback, useEffect, useRef, useState } from "react";
import apiData from "../../api";
import type { ContactProps } from "../../types";

export const useContacts = () => {
  const [contactsData, setContactsData] = useState<ContactProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const firstPagePromiseRef = useRef<Promise<ContactProps[]> | null>(null);

  const fetchFirstPage = useCallback(() => {
    if (!firstPagePromiseRef.current) {
      firstPagePromiseRef.current = apiData();
    }
    return firstPagePromiseRef.current;
  }, []);

  const runInitialFetch = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const contacts = await fetchFirstPage();
      setContactsData(contacts);
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFirstPage]);

  useEffect(() => {
    runInitialFetch();
  }, [runInitialFetch]);

  const fetchNextPage = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const nextPage = await apiData();
      setContactsData((prev) => [...prev, ...nextPage]);
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const retry = async () => {
    if (contactsData.length === 0) {
      firstPagePromiseRef.current = null;
      await runInitialFetch();
    } else {
      await fetchNextPage();
    }
  };

  return { contactsData, isLoading, error, fetchNextPage, retry };
};
