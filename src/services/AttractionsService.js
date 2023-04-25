import axios from "axios"

export const getArttractions = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/tourist-attractions`);
}

export const addAttraction = (attractionDto) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/tourist-attractions`, attractionDto);
} 

export const deleteAttraction = (attractionId) => {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}/tourist-attractions/` + attractionId);
}

export const updateAttraction = (attractionDto, attractionId) => {
    return axios.put(`${process.env.REACT_APP_BASE_URL}/tourist-attractions` + attractionId, attractionDto);
}