import React, { useState } from "react";
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { updateAttraction } from "../../services/AttractionsService";
import { TouristAttractionDto } from "../../services/dto/TouristAttractionDto";

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

export default function UpdateAttractionDetailsForm(props) {
  const attractionToEdit = props.attraction;
  console.log("HERE", attractionToEdit.id)
  const history = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const [formValue, setformValue] = useState({
    id: attractionToEdit.id,
    name: attractionToEdit.name,
    location: attractionToEdit.location,
    textDescription: attractionToEdit.textDescription,
    nrOfVisits: attractionToEdit.nrOfVisits,
    entryPrice: attractionToEdit.entryPrice,
    discount: attractionToEdit.discount,
    visitingDate: attractionToEdit.visitingDate,
    image: attractionToEdit.image,
  });

  const formSubmit = async (data) => {
    console.log("data", data);
    handleUpdate(data);
  };

  const handleUpdate = (data) => {

  const attractionDto = new TouristAttractionDto(formValue);
  
  // if(attractionDto.discount !== attractionToEdit.discount) {
  //   getUsersWithAttractionInWishlist(attractionDto.id)
  //   .then((response) => {
  //     console.log(response);
  //     if (response.status === 200) {
       
      
  //     }
  //   })
  //   .catch((err) => {
  //     Swal.fire("Error", err.response, "error").then(function () {
  //       window.location = `/attractions`;
  //     });
  //   });
  // }

   updateAttraction(attractionDto, attractionDto.id)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          Swal.fire("Success!", "Tourist attraction updated successfully!", "success").then(
            function () {
              window.location = `/attractions`;
            }
          );
        }
      })
      .catch((err) => {
        Swal.fire("Error", err.response, "error").then(function () {
          window.location = `/attractions`;
        });
      });
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Section>
      <Container>
      <form onSubmit={handleSubmit(formSubmit)}>
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput
                onChange={handleChange}
                value={formValue.name}
                name="name"
                label="Name"
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                onChange={handleChange}
                name="location"
                value={formValue.location}
                label="Location"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput
                onChange={handleChange}
                value={formValue.nrOfVisits}
                name="nrOfVisits"
                label="Number of visits"
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                onChange={handleChange}
                value={formValue.entryPrice}
                name="entryPrice"
                label="Entry price"
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                onChange={handleChange}
                value={formValue.discount}
                name="discount"
                label="Discount"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput
                onChange={handleChange}
                value={formValue.visitingDate}
                name="visitingDate"
                label="Visiting date"
                disabled="true"
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                onChange={handleChange}
                value={formValue.image}
                name="image"
                label="Image URL"
              />
            </MDBCol>
          </MDBRow>

          <MDBTextArea
            onChange={handleChange}
            name="textDescription"
            value={formValue.textDescription}
            className="mb-4"
            type="text"
            label="Description"
          />

          <MDBBtn type="submit" className="mb-4" block>
            Save changes
          </MDBBtn>
        </form>
      </Container>
    </Section>
  );
}
