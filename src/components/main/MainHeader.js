import React, { useState, useRef } from "react";
import styled from "styled-components/macro";
import {HiOutlineChevronDown} from "react-icons/hi"
import About from "../About";
import { AboutInfo } from "../../data/AboutData";

const MainHeaderSection = styled.section`
  height: 100vh;
  max-height: 1100px;
  position: relative;
  overflow: hidden;
`;

const MainHeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const Slide = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const HeaderScrollSection = styled.div`
  width: 100%;
  min-height: 30px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 20px;
  margin: 0 auto;
  position: absolute;
  z-index: 10;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;

  a {
    display: inline-block;
    pointer-events: all;
  }
`;

const ScrollArrow = styled(HiOutlineChevronDown)`
    font-size: 30px;
    color: #fff;
    font-family: ETmodules;
    font-weight: 400;
    -webkit-font-feature-settings: normal;
    font-feature-settings: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    direction: ltr;
`;

const MainHeaderSlider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5rem;

  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100vh;
    bottom: 0vh;
    left: 0;
    overflow: hidden;
    opacity: 0.4;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`;
const MainHeaderImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;

const MainHeaderContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  max-width: 1600px;
  width: calc(100%-100px);
  color: #AF5B5B;

  h1 {
    font-size: clamp(1rem, 8vw, 2rem);
    font-weight: 800;
    text-transform: uppercase;
    text-shadow: 2px 4px 4px rgba(55,125,185,0.6);
    text-align: left;
    margin-bottom: 0.8rem;
  }

  p {
    margin-bottom: 0.8rem;
    font-weight: 600;
    text-shadow: 2px 4px 4px rgba(46,91,173,0.6);
  }
`;

const MainHeader = ({ slides }) => {
  return (
    <>
    <MainHeaderSection>
      <MainHeaderWrapper>
        {slides.map((slide, index) => {
          return (
            <Slide key={index}>
              <MainHeaderSlider>
                <MainHeaderImage src={slide.image} alt={slide.alt} />
                <MainHeaderContent>
                  <h1> {slide.title} </h1>
                  <p> {slide.subtitle} </p>
                </MainHeaderContent>
                <HeaderScrollSection>
                  <a href="#">
                    <span><ScrollArrow/></span>
                  </a>
                </HeaderScrollSection>
              </MainHeaderSlider>
            </Slide>
          );
        })}
      </MainHeaderWrapper>
    </MainHeaderSection>
    <About {...AboutInfo}></About>
    </>
  );
};

export default MainHeader;
