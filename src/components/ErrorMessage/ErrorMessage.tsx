import "./ErrorMessage.css";

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
  variant?: "full" | "compact";
};

const RETRY_LABEL = "Try again";

const ErrorMessage = ({
  message,
  onRetry,
  variant = "full",
}: ErrorMessageProps) => (
  <div className={`error-message error-message--${variant}`} role="alert">
    <p className="error-message__text">{message}</p>
    {onRetry ? (
      <button type="button" className="error-message__retry" onClick={onRetry}>
        {RETRY_LABEL}
      </button>
    ) : null}
  </div>
);

export default ErrorMessage;
