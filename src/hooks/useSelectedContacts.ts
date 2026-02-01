import { useCallback, useMemo, useState } from "react";
import type { ContactProps } from "../types";

export const useSelectedContacts = (contactsData: ContactProps[]) => {
  const [selectedContactsIds, setSelectedContactsIds] = useState(
    () => new Set<string>()
  );

  const toggleContactSelect = useCallback((id: string) => {
    setSelectedContactsIds((prevState) => {
      const newState = new Set(prevState);
      if (newState.has(id)) {
        newState.delete(id);
      } else {
        newState.add(id);
      }
      return newState;
    });
  }, []);

  const orderedContacts = useMemo(() => {
    const selectedCards: ContactProps[] = [];
    const unselectedCards: ContactProps[] = [];

    contactsData.forEach((item) => {
      if (selectedContactsIds.has(item.id)) {
        selectedCards.push(item);
      } else {
        unselectedCards.push(item);
      }
    });

    return [...selectedCards, ...unselectedCards];
  }, [contactsData, selectedContactsIds]);

  return {
    selectedContactsIds,
    toggleContactSelect,
    orderedContacts,
  };
};
