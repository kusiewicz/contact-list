import "./LoadMoreButton.css";

export const LOADING_LABEL = "Loading...";
export const SHOW_MORE_LABEL = "Show more";

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
    {isLoading ? LOADING_LABEL : SHOW_MORE_LABEL}
  </button>
);

export default LoadMoreButton;
