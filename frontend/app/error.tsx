"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Hubo algun error!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Proba de nuevo
      </button>
    </div>
  );
}
