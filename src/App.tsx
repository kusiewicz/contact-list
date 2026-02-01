import Header from "./components/Header/Header";
import ContactsList from "./components/ContactsList/ContactsList";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import LoadingState from "./components/LoadingState/LoadingState";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import "./App.css";
import { useContacts } from "./hooks/useContacts/useContacts";
import { useContactsSelection } from "./hooks/useContactsSelection/useContactsSelection";

function App() {
  const { contactsData, isLoading, error, fetchNextPage, retry } =
    useContacts();

  const { selectedContactsIds, toggleContactSelect, orderedContacts } =
    useContactsSelection(contactsData);

  const hasData = contactsData.length > 0;

  const isInitialLoading = !hasData && isLoading;
  const isInitialError = !hasData && error;

  const renderContent = () => {
    if (isInitialLoading) {
      return <LoadingState />;
    }

    return (
      <>
        <ContactsList
          contacts={orderedContacts}
          selectedContactsIds={selectedContactsIds}
          onToggleSelect={toggleContactSelect}
        />

        {error ? (
          <ErrorMessage
            message={error.message}
            onRetry={retry}
            variant={isInitialError ? "full" : "compact"}
          />
        ) : (
          <LoadMoreButton isLoading={isLoading} onClick={fetchNextPage} />
        )}
      </>
    );
  };

  return (
    <div className="app">
      <Header selectedCount={selectedContactsIds.size} />
      <main>
        <section className="contacts">{renderContent()}</section>
      </main>
    </div>
  );
}

export default App;
