import "./Header.css";

type HeaderProps = {
  selectedCount: number;
};

const Header = ({ selectedCount }: HeaderProps) => (
  <header className="app__header">
    <h1 className="app__title">Contacts</h1>
    <h2 className="app__counter" aria-live="polite">
      Selected contacts: {selectedCount}
    </h2>
  </header>
);

export default Header;
