import { React, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EuroIcon from "@mui/icons-material/Euro";
import DiscountIcon from "@mui/icons-material/Discount";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

import { Button } from "./Button";
import { MDBBtn } from "mdb-react-ui-kit";
import {
  deleteAttraction,
  filterAttractions,
  getArttractions,
} from "../../services/AttractionsService";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import UpdateAttractionDetailsForm from "../admin/UpdateAttractionDetailsForm";
import { addAttractionToWishlist } from "../../services/WishlistService";
import {
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { TextSearchDto } from "../../services/dto/TextSearchDto";
import TouristAttractionDetails from "../pages/TouristAttractionDetails";

const AboutSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 4rem 0rem;
  background: #d2cbc1;
`;

const Container = styled.div`
  padding: 3rem calc(100vh -1300px);
  display: flex;
  flex-direction: column;
`;

/* Attraction List */
const AttractionList = styled.div`
  background: #ffffff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 20px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 20px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  &:hover {
    -webkit-box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
    box-shadow: 0px 0px 34px 4px rgba(33, 37, 41, 0.06);
    position: relative;
    z-index: 99;
  }
`;
const AttractionListGrid = styled.div`
  padding: 0px;
  display: block;
  border-bottom: none;
`;
const AttractionListImageContainer = styled.div`
  margin: 10px;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 250px;
  flex: 0 0 250px;
  border: none;
`;
const AttractionListImage = styled.img`
  width: 250px;
  height: 250px;
  -o-object-fit: cover;
  object-fit: cover;
`;

const AttractionListTitle = styled.div`
  margin-bottom: 5px;
`;

const AttractionListDetails = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-bottom: 0px;
  margin-left: 10px;
`;

const AttractionListOption = styled.div`
  margin: 5px 10px 5px 0px;
  font-size: 13px;
`;

const AttractionListFavouriteTime = styled.div`
  margin-left: auto;
  margin-top: 35px;
  text-align: center;
  font-size: 13px;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 80px;
  flex: 0 0 60px;
`;
const AttractionListFavourite = styled(Link)`
  display: inline-block;
  position: relative;
  height: 40px;
  width: 40px;
  line-height: 40px;
  border: 1px solid #eeeeee;
  border-radius: 100%;
  text-align: center;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  margin-bottom: 0px;
  font-size: 16px;
  color: #646f79;
  &:hover {
    background: #ffffff;
    color: #e74c3c;
  }
`;

const EditButtonContainer = styled(Link)`
  display: inline-block;
  position: relative;
  height: 40px;
  width: 40px;
  line-height: 40px;
  border: 1px solid #eeeeee;
  border-radius: 100%;
  text-align: center;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  margin-bottom: 0px;
  font-size: 16px;
  color: #646f79;
  &:hover {
    background: #ffffff;
    color: #0baf5d;
  }
`;

/* Attraction Grid */
const AttractionGrid = styled.div`
  padding: 0px;
  display: block;
  border-bottom: none;
`;

const AttractionsCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
`;
const SearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;

let user = JSON.parse(localStorage.getItem("userData"));

const TouristAttractionsView = () => {
  const [attractions, setAttractions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [attractionToEdit, setAttractionToEdit] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [filterValue, setFilterValue] = useState("name");
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const applyFilter = () => {
    const textSearchDto = new TextSearchDto(filterValue, searchInput);
    console.log("TextSearchDto", textSearchDto)
    filterAttractions(textSearchDto)
    .then((response) => {
        const attractions = response.data;
        setAttractions(attractions);
        console.log("filtered: ", attractions);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleCloseModal = () => setShowModal(false);
  const handleCloseDetailsModal = () => setShowDetailsModal(false);

  const handleShowModal = (attraction) => {
    setAttractionToEdit(attraction);
    setShowModal(true);
  };

  const handleShowDetailsModal = (attraction) => {
    setSelectedAttraction(attraction);
    setShowDetailsModal(true);
  };

  const retrieveTouristAttractions = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/tourist-attractions`)
      .then((response) => {
        const attractions = response.data;
        setAttractions(attractions);
        console.log(attractions);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveTouristAttractions();
  }, []);

  const handleDeleteByAdmin = (id) => {
    deleteAttraction(id)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          Swal.fire(
            "Success!",
            "Tourist attraction removed successfully!",
            "success"
          ).then(function () {
            window.location = `/attractions`;
          });
        }
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data, "error").then(function () {
          window.location = `/attractions`;
        });
      });
  };

  const addToFavorites = (attractionId) => {
    addAttractionToWishlist(user.id, attractionId)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          Swal.fire(
            "Success!",
            "Tourist attraction saved to wishlist.",
            "success"
          ).then(function () {
            window.location = `/attractions`;
          });
        }
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data, "error").then(function () {
          window.location = `/attractions`;
        });
      });
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <AboutSection>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit tourist attraction's details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateAttractionDetailsForm attraction={attractionToEdit} />
        </Modal.Body>
        <Modal.Footer>
          <MDBBtn variant="secondary" onClick={handleCloseModal}>
            Close
          </MDBBtn>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tourist attraction's details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TouristAttractionDetails attraction={selectedAttraction} />
        </Modal.Body>
 
      </Modal>

      <Container>
        <SearchContainer>
          <div class="sidebar">
            <div
              class="widget border-0"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div class="search">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <input
                    style={{ marginBottom: "10px" }}
                    class="form-control"
                    type="text"
                    placeholder="Search keywords"
                    onChange={handleChange}
                  />
                  <Button style={{minWidth: "10px", height:"35px", borderRadius:"5px",  marginRight: "50px" }} onClick={applyFilter}>
                    <SearchIcon />
                  </Button>
                  {user && user.userRole === "ROLE_ADMIN" && (
                <Button style={{minWidth: "230px" }} to="/admin/attractions-management/add">
                  New attraction
                </Button>
              )}
                </div>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Filter by:{" "}
                  </FormLabel>
                  <RadioGroup
                    value={filterValue}
                    name="radio-buttons-group"
                    row
                    onChange={handleFilterChange}
                  >
                    <FormControlLabel
                      value="name"
                      control={<Radio />}
                      label="Name"
                    />
                    <FormControlLabel
                      value="location"
                      control={<Radio />}
                      label="Location"
                    />
                    <FormControlLabel
                      value="textDescription"
                      control={<Radio />}
                      label="Description"
                    />
                    <FormControlLabel
                      value="visitingDate"
                      control={<Radio />}
                      label="Visiting date"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

        
            </div>
          </div>
        </SearchContainer>
        <AttractionsCardsContainer>
          {attractions &&
            attractions.map((attraction, index) => {
              return (
                <AttractionList key={index} onClick={() => handleShowDetailsModal(attraction)}>
                  <AttractionListGrid>
                    <AttractionListImageContainer>
                      <AttractionListImage
                        class="img-fluid"
                        src={attraction.image}
                        alt=""
                      />
                    </AttractionListImageContainer>
                    <AttractionListDetails>
                      <div class="Attraction-list-info">
                        <AttractionListTitle>
                          <h5>{attraction.name}</h5>
                        </AttractionListTitle>
                        <AttractionListOption>
                          <ul class="list-unstyled">
                            <li>
                              <LocationOnIcon sx={{ fontSize: 15 }} />
                              {attraction.location}
                            </li>
                            <li>
                              <EuroIcon sx={{ fontSize: 15 }} />
                              {attraction.entryPrice}
                            </li>
                            <li>
                              <DiscountIcon sx={{ fontSize: 15 }} />
                              {attraction.discount}
                            </li>
                          </ul>
                        </AttractionListOption>
                      </div>
                      <AttractionListFavouriteTime>
                        {!user || user.userRole === "ROLE_CLIENT" ? (
                          <AttractionListFavourite
                            onClick={() => addToFavorites(attraction.id)}
                          >
                            <FavoriteIcon />
                          </AttractionListFavourite>
                        ) : (
                          <>
                            <EditButtonContainer
                              onClick={() => handleShowModal(attraction)}
                            >
                              <EditIcon />
                            </EditButtonContainer>{" "}
                            <AttractionListFavourite
                              onClick={() => handleDeleteByAdmin(attraction.id)}
                            >
                              <DeleteForeverIcon />
                            </AttractionListFavourite>
                          </>
                        )}
                      </AttractionListFavouriteTime>
                    </AttractionListDetails>
                  </AttractionListGrid>
                </AttractionList>
              );
            })}
        </AttractionsCardsContainer>
      </Container>
    </AboutSection>
  );
};

export default TouristAttractionsView;
