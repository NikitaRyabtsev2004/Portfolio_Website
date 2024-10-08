import React, { useContext } from "react";
import styled from "styled-components";
import { AppText, AppTextRu } from "../../data/constants";
import { LanguageContext } from "../../utils/LanguageContext";

const Card = styled.div`
  width: 330px;
  height: 100%;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 26px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;
const Image = styled.img`
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
`;

const Tags = styled.div`
  width: auto;
  display: flex;
  margin-top: 4px;
  border-radius: 10px;
  padding: 5px;
  mix-blend-mode: difference;
  &:nth-child(1) {
    background: #8a4b4b;
  }
  &:nth-child(2) {
    background: #ad845d;
    align-items:flex-end;
  }
  &:nth-child(3) {
    background: #979156;
  }
  &:nth-child(4) {
    background: #83974d;
  }
  &:nth-child(5) {
    background: #35746b;
  }
  &:nth-child(6) {
    background: #4c5da7;
  }
  &:nth-child(7) {
    background: #403c83;
  }
  &:nth-child(8) {
    background: #693169;
  }
`;


const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 0px 2px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Date = styled.div`
  font-size: 12px;
  margin-left: 2px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 99};
  overflow: hidden;
  margin-top: 8px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;
const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 3px solid ${({ theme }) => theme.card};
`;
const Button = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 600;
  text-align: center;
`;

const ProjectCard = ({ project }) => {
  const { isRussian } = useContext(LanguageContext);
  const App_Text = isRussian ? AppTextRu : AppText;
  return (
    <Card>
      <Image src={project.image} />
      <Details>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        <Description>{project.description}</Description>
            <TagsWrapper>
          {project.tags.map((tag, index) => (
            <Tags key={index}>{tag}</Tags>
          ))}
        </TagsWrapper>
      </Details>
      <Members>
        {project.member?.map((member) => (
          <Avatar src={member.img} />
        ))}
      </Members>
      <Button href={project.github} target="_blank">
        {App_Text.projects_view_code}
      </Button>
    </Card>
  );
};

export default ProjectCard;
