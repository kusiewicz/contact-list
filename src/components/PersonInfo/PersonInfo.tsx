import "./PersonInfo.css";

type PersonInfoProps = {
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
  id: string;
  isSelected: boolean;
  onClick: (id: string) => void;
};

// aria
function PersonInfo({
  firstNameLastName,
  jobTitle,
  emailAddress,
  isSelected,
  id,
  onClick,
}: PersonInfoProps) {
  return (
    <article
      className={isSelected ? "person-info person-info--selected" : "person-info"}
      onClick={() => onClick(id)}
    >
      <div className="firstNameLastName">{firstNameLastName}</div>
      <div className="jobTitle">{jobTitle}</div>
      <div className="emailAddress">{emailAddress}</div>
      <div>debug id: {id}</div>
    </article>
  );
}

export default PersonInfo;
