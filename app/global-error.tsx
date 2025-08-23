// app/global-error.tsx
"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Critical error reporting
    console.error("CRITICAL ERROR:", error);

    // Send to monitoring service
    // reportCriticalError(error)
  }, [error]);

  return (
    <html>
      <body>
        <div className="global-error">
          <h1>Application Error</h1>
          <p>A critical error occurred. Please refresh the page.</p>
          <details>
            <summary>Error Details</summary>
            <pre>{error.message}</pre>
          </details>
          <div className="error-actions">
            <button onClick={() => reset()}>Reset Application</button>
            <button onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
