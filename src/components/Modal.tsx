import { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { BisErrorCircle } from "@meronex/icons/bi/";
import { IosWarning } from "@meronex/icons/ios/";
import { BsInfoCircleFill } from "@meronex/icons/bs/";

type TModal = {
  isShowModal: boolean;
  modalType?: "error" | "warning" | "info" | undefined;
  children?: React.ReactNode;
  onCloseModal?: () => void;
};

const modalTypeIcon = {
  error: <BisErrorCircle size={32} color="#ef4444" />,
  warning: <IosWarning size={32} color="#fef9c3" />,
  info: <BsInfoCircleFill size={32} color="#4455ef" />,
};

export function Modal({
  isShowModal,
  modalType,
  children,
  onCloseModal,
}: TModal) {
  const selectModalInfoIcon = modalType && modalTypeIcon[modalType];

  const onEscKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isShowModal) return;

      event.key === "Escape" && onCloseModal && onCloseModal();

      return;
    },
    [isShowModal, onCloseModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", onEscKeyDown, false);
    return () => {
      window.removeEventListener("keydown", onEscKeyDown, false);
    };
  }, [onEscKeyDown]);

  return isShowModal ? (
    <>
      {ReactDOM.createPortal(
        <>
          <div className="bg-gray-900 opacity-70 fixed left-0 top-0 w-screen h-fill overflow-auto"></div>
          <section
            className="bg-white rounded px-6 pb-6 fixed m-auto top-20 left-1/3 z-10 max-w-md w-[100%] overflow-hidden"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="relative overflow-auto w-auto rounded-lg">
              <header className="flex items-center justify-end">
                <button
                  className="text-6xl text-[#344D67]"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onCloseModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </header>
              <div className="flex items-center justify-center flex-col text-center">
                {selectModalInfoIcon}
                {children}
              </div>
            </div>
          </section>
        </>,
        document.body
      )}
    </>
  ) : null;
}
