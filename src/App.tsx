import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import ContactsList from "./components/ContactsList/ContactsList";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import "./App.css";
import type { ContactProps } from "./types";
import { useContacts } from "./hooks/useContacts";

// react profiller
function App() {
  const [selectedContactsIds, setSelectedContactsIds] = useState(
    () => new Set<string>()
  );
  const { contactsData, isLoading, error, fetchNextPage } = useContacts();

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
        return selectedCards.push(item);
      }
      unselectedCards.push(item);
    });

    return [...selectedCards, ...unselectedCards];
  }, [contactsData, selectedContactsIds]);

  return (
    <div className="app">
      <Header selectedCount={selectedContactsIds.size} />
      <main>
        <section className="contacts">
          <ContactsList
            contacts={orderedContacts}
            selectedContactsIds={selectedContactsIds}
            onToggleSelect={toggleContactSelect}
          />
          <LoadMoreButton isLoading={isLoading} onClick={fetchNextPage} />
          {error ? <ErrorMessage message={error.message} /> : null}
        </section>
      </main>
    </div>
  );
}

export default App;
