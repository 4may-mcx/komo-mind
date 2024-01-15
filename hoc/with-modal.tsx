import { CommonModalProps } from "@/components/modals/common-modal";
import React, {
  ComponentType,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

const withModalTrigger = <P extends CommonModalProps>(
  ModalComponent: ComponentType<P>
) => {
  const WithModalWrapper: FC<
    P & {
      triggerNode: (show: () => void) => ReactNode;
    }
  > = ({ triggerNode, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const newProps = {
      isOpen,
      onCancel: () => setIsOpen(false),
      ...props,
    } as unknown as P;

    useEffect(() => {
      setIsMounted(true);
    }, []);

    return (
      <>
        {triggerNode(() => setIsOpen(true))}
        {isMounted &&
          createPortal(<ModalComponent {...newProps} />, document.body)}
      </>
    );
  };

  return WithModalWrapper;
};

export default withModalTrigger;
