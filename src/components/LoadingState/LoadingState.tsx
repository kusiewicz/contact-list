import "./LoadingState.css";

const LoadingState = () => (
  <div className="loading-state" role="status" aria-live="polite">
    <span className="loading-state__spinner" aria-hidden="true" />
    <span>Loading contacts…</span>
  </div>
);

export default LoadingState;
