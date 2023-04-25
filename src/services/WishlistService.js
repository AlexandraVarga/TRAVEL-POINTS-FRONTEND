import axios from "axios"

export const viewWishlist = (clientId) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/wishlists/${clientId}`);
}

export const addAttractionToWishlist = (clientId, attractionId) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/wishlists/client/${clientId}/attraction/${attractionId}`);
} 

