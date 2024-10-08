import React, { useContext, useEffect, useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Bio } from "../data/constants";
import { AppText, AppTextRu } from "../data/constants";
import { MenuRounded } from "@mui/icons-material";
import { LanguageContext } from "../utils/LanguageContext";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  width: 80%;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  text-align: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 0px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  height: 70px;
  max-width: 100px;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const LanguageButton = styled.div`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 5px;
  margin-right: -25px;
  margin-left: -25px;
  font-size: 14px;
  font-weight: 500;
  height: 70px;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
  @media (max-width: 768px) {
    position: absolute;
    margin: 0px 0px 0px 0px;
  }
`;

const ThemeButton = styled.div`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 5px;
  margin-right: -5px;
  font-size: 14px;
  font-weight: 500;
  height: 70px;
  transition: all 0.6s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
  @media (max-width: 768px) {
    position: absolute;
    margin: 0px 0px 0px 0px;
  }
`;

const Navbar = ({ toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const { isRussian, toggleLanguage } = useContext(LanguageContext);
  const App_Text = isRussian ? AppTextRu : AppText;

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">Nikitas FullStack Factory</NavLogo>

        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavItems>
          <NavLink href="#About">{App_Text.about}</NavLink>
          <NavLink href="#Skills">{App_Text.skills}</NavLink>
          <NavLink href="#Experience">{App_Text.experience}</NavLink>
          <NavLink href="#Projects">{App_Text.projects}</NavLink>
          <NavLink href="#Education">{App_Text.education}</NavLink>
          <LanguageButton onClick={toggleLanguage}>
            {App_Text.language}
          </LanguageButton>

          <ThemeButton onClick={toggleTheme}>{App_Text.theme}</ThemeButton>
        </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#About">
              {App_Text.about}
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Skills">
              {App_Text.skills}
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Experience">
              {App_Text.experience}
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Projects">
              {App_Text.projects}
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#Education">
              {App_Text.education}
            </NavLink>

            <LanguageButton
              style={{ right: "10px", top: "90px" }}
              onClick={toggleLanguage}
            >
              {App_Text.language}
            </LanguageButton>

            <ThemeButton style={{ right: "10px" }} onClick={toggleTheme}>
              {App_Text.theme}
            </ThemeButton>

            <Button
              href={Bio.github}
              target="_Blank"
              style={{
                background: theme.primary,
                color: theme.text_primary,
              }}
            >
              {App_Text.github_profile}
            </Button>
          </MobileMenu>
        )}

        <ButtonContainer>
          <Button href={Bio.github} target="_Blank">
            {App_Text.github_profile}
          </Button>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
