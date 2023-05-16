import "./Navbar.css";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { MenuData } from "../../data/MenuData";
import { Button } from "./Button";
import { HiMenuAlt3 } from "react-icons/hi";

const Nav = styled.nav`
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 1rem 2rem;
  z-index: 100;
  position: fixed;
  width: 100%;
  background: #0c3a4b;
  &.active {
    background: #0c3a4b;
  }
`;

const NavLink = css`
  color: #fff !important;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  text-decoration: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const Logo = styled(Link)`
  ${NavLink}
  font-style: italic;
`;

const MenuBars = styled(HiMenuAlt3)`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    color: #fff;
    height: 40px;
    width: 40px;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(-50%, 25%);
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: right;
  margin-right: -48px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavMenuLinks = styled(Link)`
  ${NavLink}
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navbar = ({ toggle }) => {
  const [offset, setOffset] = useState(0);

  let user = JSON.parse(localStorage.getItem("userData"));
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const logOut = () => {
    window.localStorage.clear();
    window.location.reload();
  }

  const handleScroll = () => setOffset(window.pageYOffset);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [isNavActive, setIsNavActive] = useState(false);

  useEffect(() => {
    if (offset > 100) {
        setIsNavActive(true);
    } else {
        setIsNavActive(false);
    }
  }, [offset]);

  return (
    <Nav className={isNavActive ? "navbar active" : "navbar"}>
      <Logo to="/home">TravelPoints</Logo>
      <MenuBars onClick={toggle} />
      <NavMenu>
        {MenuData.map((item, index) => (
          <NavMenuLinks to={item.link} key={index}>
            {item.title}
          </NavMenuLinks>
        ))}
      </NavMenu>
      <NavBtn>
        {user === null ? <Button to="/login" onNav="true" >
          {" "}
          Log in
        </Button> :
        <Button onClick={logOut} onNav="true" >
          {" "}
          Log out 
        </Button>}
      </NavBtn>
    </Nav>
  );
};

export default Navbar;
