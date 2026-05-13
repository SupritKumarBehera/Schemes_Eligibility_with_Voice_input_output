function ErrorBanner({ error }) {
  if (!error) return null;
  return <div className="error-banner">{error}</div>;
}

export default ErrorBanner;
