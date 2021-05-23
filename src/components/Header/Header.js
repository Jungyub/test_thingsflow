import React from "react";
import styled from "styled-components";

const Header = () => {
  return <HeaderContainer>Angular / Angular-Cli</HeaderContainer>;
};

export default Header;

const HeaderContainer = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 100px;
`;
