import React from "react";
import {
  ModalWrap,
  ModalBackdrop,
  ModalHeader,
  HeaderTitle,
  ModalClose,
  ModalBody,
} from "./style";

const Modal = ({
  title,
  children,
  closeHandler,
}: {
  title: string;
  children: any;
  closeHandler: any;
}) => {
  const closeModal = () => {
    closeHandler();
  };

  return (
    <>
      <ModalBackdrop />
      <ModalWrap>
        <ModalHeader>
          <HeaderTitle>{title}</HeaderTitle>
          <ModalClose onClick={closeModal}>+</ModalClose>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalWrap>
    </>
  );
};

export default Modal;
