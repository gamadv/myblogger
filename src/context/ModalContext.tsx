import React, { useState, createContext, useContext, ReactNode } from "react";
import { Modal } from "../components/Modal";

interface ModalContextData {
  isShowModal: boolean;
  toggleModal: () => void;
  handleGetModalInfo: (
    modalType: "error" | "warning" | "info",
    children?: ReactNode
  ) => void;
}

interface IModalInfo {
  modalType: "error" | "warning" | "info";
  children?: ReactNode;
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
      <Modal
        isShowModal={isShowModal}
        modalType={modalInfo.modalType}
        onCloseModal={toggleModal}
        children={modalInfo.children}
      />
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  return useContext(ModalContext);
};
