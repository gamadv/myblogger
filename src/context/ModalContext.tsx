import ReactDOM from "react-dom";
import React, { useState, createContext, useContext, ReactNode } from "react";

import { BisErrorCircle } from "@meronex/icons/bi";
import { BsInfoCircleFill } from "@meronex/icons/bs";
import { IosWarning } from "@meronex/icons/ios";

const modalTypeIcon = {
  error: <BisErrorCircle size={32} color="#ef4444" />,
  warning: <IosWarning size={32} color="#fef9c3" />,
  info: <BsInfoCircleFill size={32} color="#4455ef" />,
};

interface IModalInfo {
  modalType: "error" | "warning" | "info";
  children?: ReactNode;
}

interface ModalContextData {
  isShowModal: boolean;
  toggleModal: () => void;
  handleGetModalInfo: (
    modalType: "error" | "warning" | "info",
    children?: ReactNode
  ) => void;
}

export const ModalContext = createContext<ModalContextData>(
  {} as ModalContextData
);

export function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<IModalInfo>({
    modalType: "info",
  });

  function toggleModal() {
    setIsShowModal((oldState) => !oldState);
  }

  function handleGetModalInfo(
    modalType: "error" | "warning" | "info",
    children?: ReactNode
  ) {
    setModalInfo({ modalType, children });
    setIsShowModal(true);
  }

  const data = {
    isShowModal,
    toggleModal,
    handleGetModalInfo,
  };

  return (
    <ModalContext.Provider value={data}>
      {children}
      <>
        {isShowModal
          ? ReactDOM.createPortal(
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
                        onClick={toggleModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </header>
                    <div className="flex items-center justify-center flex-col text-center">
                      {modalTypeIcon[modalInfo.modalType]}
                      {modalInfo.children}
                    </div>
                  </div>
                </section>
              </>,
              document.body
            )
          : null}
      </>
    </ModalContext.Provider>
  );
}

export const useErrorModal = () => {
  return useContext(ModalContext);
};
