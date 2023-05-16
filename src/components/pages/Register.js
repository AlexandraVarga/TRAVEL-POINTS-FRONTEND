import React, { useState } from "react";
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import styled from "styled-components";
import Select from 'react-select';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 7rem 15px 0rem 15px;
  background: #ffff;
  color: #0c3a4b;
  font-weight: 700;
`;

const Container = styled.div`
  padding: 3rem calc(100vh -1300px);
  display: flex;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: 600px;
  justify-content: center;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default function CreateUserForm() {
  const history = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const selectData = [{ value: '7-18', label:'7-18' }, { value: '19-25', label:'19-25' }, { value: '26-60', label:'26-60' }, { value: '60+', label:'60+' }];
  const [formValue, setformValue] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    ageCategory: ""
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const formSubmit = async (data) => {
    console.log("data", data);
    handleInsert(data);
  };

  const handleInsert = (data) => {
    setLoading(true);
    setIsError(false);
    const user = {
      username: formValue.username,
      email:  formValue.email,
      password: formValue.password,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      address: formValue.address,
      ageCategory: formValue.ageCategory
    };

    axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, user)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          Swal.fire(
            "Success!",
            "User created successfully!",
            "success"
          )
          .then(function() { window.location = `/home`; });
        }

      })
      .catch((err) => {
        Swal.fire("Error", err.response.data, "error")
        .then(function() { window.location = `/home`; });

      })
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  };

  const handleSelectChange = (returnedValue, action) => {
    setformValue({
      ...formValue,
      [action.name]: returnedValue.value
    });
  };
  return (
    <Section>
      <Container>
        <form onSubmit={handleSubmit(formSubmit)}>
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput onChange={handleChange} name="firstName" label="First name" />
            </MDBCol>
            <MDBCol>
              <MDBInput onChange={handleChange} name="lastName" label="Last name" />
            </MDBCol>
            <MDBCol>
              <MDBInput onChange={handleChange} name="username" label="Username" />
            </MDBCol>
            <MDBCol>
              <MDBInput
                onChange={handleChange}
                name="address"
                label="Address"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput onChange={handleChange} name="phone" label="Phone" />
            </MDBCol>
            <MDBCol>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="ageCategory"
                options={selectData}
                style={{ width: `100%`, padding: `0px` }}
                label="Age category"
                onChange={handleSelectChange}
              >
              </Select>
            </MDBCol>
          </MDBRow>
          <MDBInput
            onChange={handleChange}
            name="email"
            className="mb-4"
            type="email"
            label="Email address"
          />
          <MDBInput
            onChange={handleChange}
            name="password"
            className="mb-4"
            type="password"
            label="Password"
          />

          <MDBBtn type="submit" className="mb-4" block>
            Create
          </MDBBtn>
        </form>
      </Container>
    </Section>
  );
}
