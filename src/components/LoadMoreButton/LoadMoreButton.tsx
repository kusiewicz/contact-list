import "./LoadMoreButton.css";

type LoadMoreButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

const LoadMoreButton = ({ isLoading, onClick }: LoadMoreButtonProps) => (
  <button
    onClick={onClick}
    className="contacts__load-more"
    disabled={isLoading}
  >
    {isLoading ? "Loading..." : "Show more"}
  </button>
);

export default LoadMoreButton;
