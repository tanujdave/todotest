import React from "react";
import { Header } from "@templates";
import styled from "styled-components";

const Page = styled("div")``;

const MainContainer = styled("div")`
  padding-top: 46px;
  max-width: 1335px;
  margin: 0 auto;
`;

interface Props {
  children: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <Page>
      <Header />
      <MainContainer role="main">{children}</MainContainer>
    </Page>
  );
};

export default Main;
