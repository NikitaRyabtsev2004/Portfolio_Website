import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { AppText, AppTextRu } from "../../data/constants";
import { LanguageContext } from "../../utils/LanguageContext";
import Swal from 'sweetalert2';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
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

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 100ms ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Contact = () => {
  const { isRussian } = useContext(LanguageContext);
  const App_Text = isRussian ? AppTextRu : AppText;
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(form.current);
    const data = {
      from_email: formData.get("from_email"),
      from_name: formData.get("from_name"),
      subject: formData.get("subject"),
      message: formData.get("message")
    };

    fetch("http://localhost:7000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (response.ok) {
        Swal.fire({
          title: 'Успех!',
          text: 'Сообщение успешно отправлено!',
          icon: 'success',
          confirmButtonText: 'ОК',
        });
        form.current.reset();
      } else {
        throw new Error("Ошибка при отправке");
      }
    })
    .catch((error) => {
      Swal.fire({
        title: 'Ошибка!',
        text: 'Ошибка при отправке сообщения!',
        icon: 'error',
        confirmButtonText: 'ОК',
      });
    });
  };

  return (
    <Container id="Education">
      <Wrapper>
        <Title>{App_Text.contact}</Title>
        <Desc style={{ marginBottom: "40px" }}>{App_Text.contact_text}</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>{App_Text.email_me}🚀</ContactTitle>
          <ContactInput placeholder={App_Text.your_email} name="from_email" required />
          <ContactInput placeholder={App_Text.name} name="from_name" required />
          <ContactInput placeholder={App_Text.subject} name="subject" required />
          <ContactInputMessage placeholder={App_Text.message} name="message" rows={4} required />
          <ContactButton type="submit" value={App_Text.send} />
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
