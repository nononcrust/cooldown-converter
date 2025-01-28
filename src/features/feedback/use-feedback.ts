import { noop } from "es-toolkit";
import { useState } from "react";

export const useFeedback = () => {
  const [isPending, setIsPending] = useState(false);

  const submit = async (message: string) => {
    setIsPending(true);

    try {
      await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({
          message,
        }),
      });
    } catch {
      noop();
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, submit };
};
