import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import apiData from "./api";
import PersonInfo from "./PersonInfo";
import "./App.css";

type ContactProps = {
  id: string;
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
};

// react profiller
function App() {
  const [contactsData, setContactsData] = useState<ContactProps[]>([]);
  const [selectedContactsIds, setSelectedContactsIds] = useState(
    () => new Set<string>()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const firstPagePromiseRef = useRef<Promise<ContactProps[]> | null>(null);

  const fetchFirstPage = useCallback(() => {
    if (!firstPagePromiseRef.current) {
      firstPagePromiseRef.current = apiData();
    }
    return firstPagePromiseRef.current;
  }, []);

  useEffect(() => {
    const fetchContactsFirstPage = async () => {
      try {
        const contacts = await fetchFirstPage();
        setContactsData(contacts);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchContactsFirstPage();
  }, [fetchFirstPage]);

  const toggleContactSelect = (id: string) => {
    setSelectedContactsIds((prevState) => {
      const newState = new Set(prevState);
      if (newState.has(id)) newState.delete(id);
      else newState.add(id);
      return newState;
    });
  };

  const fetchNextPage = async () => {
    setIsLoading(true);
    try {
      const nextPage = await apiData().finally(() => setIsLoading(false));

      setContactsData((prevState) => [...prevState, ...nextPage]);
    } catch (error) {
      setError(error as Error);
    }
  };

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
      <header className="app__header">
        <h1 className="app__title">Contacts</h1>
        <h2 className="app__counter" aria-live="polite">
          Selected contacts: {selectedContactsIds.size}
        </h2>
      </header>

      <main>
        <section className="contacts">
          <ul className="contacts__list">
            {orderedContacts.map(
              ({ id, firstNameLastName, jobTitle, emailAddress }) => (
                <li className="contacts__list-item">
                  <PersonInfo
                    key={id}
                    id={id}
                    firstNameLastName={firstNameLastName}
                    jobTitle={jobTitle}
                    emailAddress={emailAddress}
                    onClick={toggleContactSelect}
                    isSelected={selectedContactsIds.has(id)}
                  />
                </li>
              )
            )}
          </ul>
          <button
            onClick={fetchNextPage}
            className="contacts__load-more"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Show more"}
          </button>
          {error ? <p>{error.message}</p> : null}
        </section>
      </main>
    </div>
  );
}

export default App;
