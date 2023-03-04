import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();
  const navigate=useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_qrpa7kx', 'template_cq5tl0s', form.current, '9t-kfHNB17VtgH5wt')
      .then((result) => {
          console.log(result.text);
          {navigate("sent");}

      }, (error) => {
          console.log(error.text);
      }); 
  };

  return (
    <StyledContactForm>
      <form ref={form} onSubmit={sendEmail}>
        <label>Project Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Telegram</label>
        <input type="text" name="telegram" />
        <label>Twitter</label>
        <input type="text" name="twitter" />
        <label>Webpage</label>
        <input type="text" name="webpage" />
        <label>Project description</label>
        <textarea name="message" />
        <input type="submit"   value="Send" />
      </form>
    </StyledContactForm>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 400px;

  form {
    display: flex-container;
    align-items: center;
    flex-direction: column;
    width: 90%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 10px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;