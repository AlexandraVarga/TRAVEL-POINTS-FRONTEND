import React from "react";
import styled from "styled-components";
import { Button } from "./common/Button";

const AboutSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 4rem 0rem;
  background: #ffff;
  color: #0c3a4b;
  font-weight: 700;
`;

const Container = styled.div`
  padding: 3rem calc(100vh -1300px);
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: 600px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ColumnLeft = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.4;
  padding: 1rem 2rem;
  order: ${({ reverse }) => (reverse ? "2" : "1")};
  margin-left: 1.5rem;
  h1 {
    margin: 0rem;
    font-size: clamp(1.5rem, 6vh, 2rem);
    align-self: flex-start;
  }

  p {
    margin-bottom: 2rem;
  }
`;

const ColumnRight = styled.section`
  padding: 1rem 2rem;
  order: ${({ reverse }) => (reverse ? "1" : "2")};
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    order: ${({ reverse }) => (reverse ? "2" : "1")};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    @media screen {
      width: 90%;
      height: 90%;
    }
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  background: #0c3a4b;
`;

const About = ({ heading, paragraph, buttonLabel, reverse, image }) => {
  return (
    <AboutSection>
      <Container>
        <ColumnLeft>
          <h1> {heading} </h1>
          <br/>
          <p> {paragraph} </p>
          <br /> <br />
          <BtnWrap>
          <Button big="true" to="/login">
            {buttonLabel}
          </Button>
        </BtnWrap>
        </ColumnLeft>
        <ColumnRight revrse={reverse}>
          <img src={image} alt="About" />
        </ColumnRight>
      </Container>
    </AboutSection>
  );
};

export default About;
