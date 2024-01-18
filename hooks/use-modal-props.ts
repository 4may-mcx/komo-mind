import { useState } from "react";

const useModalProps = (defaultValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(defaultValue || false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return {
    isOpen,
    closeModal,
    openModal,
  };
};

export default useModalProps;
