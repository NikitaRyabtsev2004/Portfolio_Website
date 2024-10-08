import React, { useContext } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styled from "styled-components";
import {
  AppText,
  AppTextRu,
  Bio,
  BioRu,
  education,
  educationRu,
} from "../../data/constants";
import EducationCard from "../cards/EducationCard";
import EarthCanvas from "../canvas/Earth";
import { LanguageContext } from "../../utils/LanguageContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  position: rlative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Education = () => {
  const { isRussian } = useContext(LanguageContext);
  const App_Text = isRussian ? AppTextRu : AppText;
  const educationData = isRussian ? educationRu : education;

  return (
    <Container id="Education">
      <Wrapper>
        <Title>{App_Text.education}</Title>
        <Desc style={{ marginBottom: "40px" }}>{App_Text.education_text}</Desc>

        <VerticalTimeline>
          {educationData.map((educationItem, index) => (
            <EducationCard
              key={`education-${index}`}
              education={educationItem}
            />
          ))}
        </VerticalTimeline>
        <EarthCanvas />
      </Wrapper>
    </Container>
  );
};

export default Education;
