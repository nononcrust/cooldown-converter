import { useState } from "react";

export const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  const clear = () => {
    setValue("");
  };

  return {
    value,
    onChange,
    reset,
    clear,
    setValue,
  };
};
