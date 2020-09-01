import styled from "styled-components";

export const ModalWrap = styled("div")`
  width: 450px;
  height: auto;
  min-height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1a1c22;
  z-index: 1;
  border-radius: 5px;
`;

export const ModalBackdrop = styled("div")`
  background: #252832;
  opacity:0.8;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
`;
export const ModalHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
`;
export const HeaderTitle = styled("h3")`
  font-weight: bolder;
`;
export const ModalClose = styled("div")`
  cursor: pointer;
  transform: rotate(44deg);
  font-size: 2rem;
  position: absolute;
  right: 20px;
  top: 8px;
`;
export const ModalBody = styled("div")`
  padding: 20px;
`;