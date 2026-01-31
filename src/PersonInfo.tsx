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
      style={{
        display: "flex",
        height: "100px",
        justifyContent: "center",
        flexDirection: "column",
        padding: "32px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
        margin: "10px 0",
        background: isSelected ? "red" : "#fff",
        cursor: "pointer",
      }}
      className="person-info"
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
