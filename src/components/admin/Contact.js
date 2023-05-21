import { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px;
`;

const Form = styled.form`
  font-size: 1.6rem;
  font-weight: 300;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Input = styled.input`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  font-size: 1.6rem;
  font-weight: 400;
  padding: 6px 8px;
  margin: 0 5px 0 0;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  color: #fff;
  background: #0c3a4b;
  margin-top: 10px;
`;

const H2 = styled.h2`
  text-align: center;
  margin-top: 20px;
`;

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("HERE");
    emailjs
      .sendForm(
        "service_q4y95uq",
        "template_871zydv",
        form.current,
        "YY1mCxKv2gjDY2A81"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <section>
      <Container>
        <H2>Contact Us</H2>
        <Form ref={form} onSubmit={sendEmail}>
          <Input
            type="text"
            placeholder="Full Name"
            name="user_name"
            required
          />
          <Input type="email" placeholder="Email" name="user_email" required />
          <Input type="text" placeholder="Subject" name="subject" required />
          <textarea name="message" cols="30" rows="5"></textarea>
          <Button type="submit">Send Message</Button>
        </Form>
      </Container>
    </section>
  );
};

export default Contact;
