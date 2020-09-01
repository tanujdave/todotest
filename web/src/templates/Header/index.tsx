import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled("header")`
  background-color: #1a1c22;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  padding: .5rem 1rem;
`;
const HeaderTitle = styled("div")`
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderTitle>Todo App</HeaderTitle>
    </HeaderWrapper>
  );
};

export default Header;
