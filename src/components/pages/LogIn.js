import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #0c3a4b;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

const Title = styled.h2`
  font-weight: normal;
  color: #2a2a29;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

function LogIn() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    handleLogin(data);
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleLogin = () => {
    const user = {
      username: data.username,
      password: data.password
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, user)
      .then((res) => {
        setData(res.data);
        setLoading(false);

        if (res.status === 200) {
          localStorage.setItem("userData", JSON.stringify(res.data));
          console.log(res.data)
          localStorage.setItem("isAuthenticated", "true");

          Swal.fire("Success!", "Login Success!", "success").then(() => {
            navigate("/home");
            window.location.reload();
          });
        } else {
          Swal("Error", "Login failed!", "error");
          navigate("/home");
          window.location.reload();
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Login failed!", "error");
        setLoading(false);
        setIsError(true);
      });
  };
 
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("userData"));
  } 

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit(formSubmit)}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Button type="submit" className="login-btn">
            Log in
          </Button>
        </Form>
      </Wrapper>
    </>
  );
}

export default LogIn;
