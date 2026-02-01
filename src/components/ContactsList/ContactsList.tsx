import { memo } from "react";
import PersonInfo from "../PersonInfo/PersonInfo";
import type { ContactProps } from "../../types";
import "./ContactsList.css";

type ContactsListProps = {
  contacts: ContactProps[];
  selectedContactsIds: Set<string>;
  onToggleSelect: (id: string) => void;
};

const MemoizedPersonInfo = memo(PersonInfo);

const ContactsList = ({
  contacts,
  selectedContactsIds,
  onToggleSelect,
}: ContactsListProps) => {
  return (
    <ul className="contacts__list">
      {contacts.map(({ id, firstNameLastName, jobTitle, emailAddress }) => (
        <li className="contacts__list-item" key={id}>
          <MemoizedPersonInfo
            id={id}
            firstNameLastName={firstNameLastName}
            jobTitle={jobTitle}
            emailAddress={emailAddress}
            onClick={onToggleSelect}
            isSelected={selectedContactsIds.has(id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;
