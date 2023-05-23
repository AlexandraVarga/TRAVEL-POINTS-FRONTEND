import axios from "axios";

export const getReviews = (touristAttractionId) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/reviews/tourist-attraction/` + touristAttractionId);
}

export const postReview = (clientId, touristAttractionId, reviewDto) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/reviews/client/` + clientId + `/attraction/`+ touristAttractionId, reviewDto);
} 