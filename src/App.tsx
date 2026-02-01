import Header from "./components/Header/Header";
import ContactsList from "./components/ContactsList/ContactsList";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import "./App.css";
import { useContacts } from "./hooks/useContacts";
import { useSelectedContacts } from "./hooks/useSelectedContacts";

function App() {
  const { contactsData, isLoading, error, fetchNextPage } = useContacts();

  const { selectedContactsIds, toggleContactSelect, orderedContacts } =
    useSelectedContacts(contactsData);

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
