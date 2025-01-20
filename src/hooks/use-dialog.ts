import { useState } from "react";

export const useDialog = (initialIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const onOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return {
    isOpen,
    open,
    close,
    toggle,
    onOpenChange,
  };
};
