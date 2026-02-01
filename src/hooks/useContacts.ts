import { useCallback, useEffect, useRef, useState } from "react";
import apiData from "../api";
import type { ContactProps } from "../types";

export const useContacts = () => {
  const [contactsData, setContactsData] = useState<ContactProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const firstPagePromiseRef = useRef<Promise<ContactProps[]> | null>(null);

  const fetchFirstPage = useCallback(() => {
    if (!firstPagePromiseRef.current) {
      firstPagePromiseRef.current = apiData();
    }
    return firstPagePromiseRef.current;
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const contacts = await fetchFirstPage();
        setContactsData(contacts);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetch();
  }, [fetchFirstPage]);

  const fetchNextPage = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const nextPage = await apiData().finally(() => setIsLoading(false));
      setContactsData((prevState) => [...prevState, ...nextPage]);
    } catch (error) {
      setError(error as Error);
    }
  };

  return { contactsData, isLoading, error, fetchNextPage };
};
