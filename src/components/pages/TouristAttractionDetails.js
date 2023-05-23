import DescriptionIcon from "@mui/icons-material/Description";
import DiscountIcon from "@mui/icons-material/Discount";
import EuroIcon from "@mui/icons-material/Euro";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NumbersIcon from "@mui/icons-material/Numbers";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getReviews, postReview } from "../../services/ReviewService";
import { ReviewDto } from "../../services/dto/ReviewDto";
import Swal from "sweetalert2";
import { List, ListItem } from "@mui/material";
const Container = styled.div`
  display: flex;
  justify-content: center:
  align-items: center;
`;

const AttractionListOption = styled.div`
  margin: 5px 10px 5px 0px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AttractionListTitle = styled.div`
  margin-top: 2px;
`;

const AttractionListImageContainer = styled.div`
  margin-right: 25%;
  margin-left: 25%;
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

const AttractionListDetails = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-bottom: 0px;
  margin-left: 10px;
`;

const ReviewsContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;
let user = JSON.parse(localStorage.getItem("userData"));

const TouristAttractionDetails = (props) => {
  const attraction = props.attraction;
  const [reviewComment, setReviewComment] = useState("");
  const [reviews, setReviews] = useState();
  const [newReviewPosted, setNewReviewPosted] = useState(false);
  const retrieveReviews = () => {
    getReviews(attraction.id)
      .then((response) => {
        const reviews = response.data;
        setReviews(reviews);
        console.log(reviews);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveReviews();
  }, [newReviewPosted]);

  const handlePostReview = () => {
    const reviewDto = new ReviewDto(reviewComment, user.id, attraction.id);
    console.log("HERE", reviewDto);
    postReview(user.id, attraction.id, reviewDto)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setNewReviewPosted(true);
          Swal.fire("Success!", "Review posted!", "success").then(
            setNewReviewPosted(false)
          );
        }
      })
      .catch((err) => {
        Swal.fire("Error", err.response.data, "error");
      });
  };

  const handleChange = (event) => {
    setReviewComment(event.target.value);
  };

  return (
    <Container>
      <AttractionListImageContainer>
        <AttractionListImage class="img-fluid" src={attraction.image} alt="" />
        <AttractionListDetails>
          <div class="Attraction-list-info">
            <AttractionListTitle>
              <h5>{attraction.name}</h5>
            </AttractionListTitle>
            <AttractionListOption>
              <List>
                <li>
                  <LocationOnIcon sx={{ fontSize: 15 }} />
                  Location: {attraction.location}
                </li>
                <li>
                  <EuroIcon sx={{ fontSize: 15 }} />
                  Entry price: {attraction.entryPrice}
                </li>
                <li>
                  <DiscountIcon sx={{ fontSize: 15 }} />
                  Discount: {attraction.discount}%
                </li>
                <li>
                  <DescriptionIcon sx={{ fontSize: 15 }} />
                  Description: {attraction.textDescription}
                </li>
                <li>
                  <NumbersIcon sx={{ fontSize: 15 }} />
                  Number of visits: {attraction.nrOfVisits}
                </li>
              </List>
              <ReviewsContainer>
                Reviews:
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 300,
                    bgcolor: "background.paper",
                    position: "relative",
                    overflowY: "auto",
                    overflowWrap: "anywhere",
                    maxHeight: 100,
                    marginBottom: "10px",
                    "& ul": { padding: 0 },
                  }}
                >
                  {reviews &&
                    reviews.map((review, index) => {
                      return (
                        <ListItem key={index}>
                          {review.clientName + ": " + review.review}
                        </ListItem>
                      );
                    })}
                </List>
              </ReviewsContainer>
              <MDBInput
                style={{ marginTop: "10px" }}
                onChange={handleChange}
                value={reviewComment}
                placeholder="Leave a review/ comment"
                name="comment"
                label="Comment"
              />
              <MDBBtn
                rounded
                style={{ marginTop: "10px" }}
                className="mx-2"
                color="dark"
                onClick={handlePostReview}
              >
                Post review
              </MDBBtn>
            </AttractionListOption>
          </div>
        </AttractionListDetails>
      </AttractionListImageContainer>
    </Container>
  );
};

export default TouristAttractionDetails;
