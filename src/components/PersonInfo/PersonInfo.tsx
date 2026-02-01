import "./PersonInfo.css";

type PersonInfoProps = {
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
  id: string;
  isSelected: boolean;
  onClick: (id: string) => void;
};

const getInitials = (fullName: string) =>
  fullName
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

function PersonInfo({
  firstNameLastName,
  jobTitle,
  emailAddress,
  isSelected,
  id,
  onClick,
}: PersonInfoProps) {
  const initials = getInitials(firstNameLastName);

  return (
    <button
      className={
        isSelected ? "person-info person-info--selected" : "person-info"
      }
      onClick={() => onClick(id)}
      aria-pressed={isSelected ? true : false}
    >
      <header className="person-info__header">
        {initials ? (
          <div className="person-info__avatar" aria-hidden="true">
            {initials}
          </div>
        ) : null}
        <div className="person-info__header-text">
          <div className="person-info__name">{firstNameLastName}</div>
          <div className="person-info__job-title">{jobTitle}</div>
        </div>
      </header>
      <div className="person-info__email">{emailAddress}</div>
    </button>
  );
}

export default PersonInfo;
