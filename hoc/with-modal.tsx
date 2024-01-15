import { CommonModalProps } from "@/components/modals/common-modal";
import React, {
  ComponentType,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";

type ModalWithTriggerProps = CommonModalProps & {
  triggerNode: (show: () => void) => ReactNode;
};

const withModalTrigger = (ModalComponent: ComponentType<CommonModalProps>) => {
  const WithModalWrapper: FC<ModalWithTriggerProps> = ({
    triggerNode,
    ...props
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const newProps = {
      isOpen,
      onCancel: () => setIsOpen(false),
      ...props,
    };

    useEffect(() => {
      setIsMounted(true);
    }, []);

    return (
      <>
        {triggerNode(() => setIsOpen(true))}
        {isMounted && <ModalComponent {...newProps} />}
      </>
    );
  };

  return WithModalWrapper;
};

export default withModalTrigger;
