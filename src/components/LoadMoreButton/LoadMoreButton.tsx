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
    aria-busy={isLoading}
  >
    <span className="contacts__load-more-content">
      {isLoading ? (
        <span className="contacts__load-more-spinner" aria-hidden="true" />
      ) : null}
      <span>{isLoading ? LOADING_LABEL : SHOW_MORE_LABEL}</span>
    </span>
  </button>
);

export default LoadMoreButton;
