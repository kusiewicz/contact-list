import "./ErrorMessage.css";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p className="error-message" role="alert">
    {message}
  </p>
);

export default ErrorMessage;
