import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled(Link)`
    background-color: ${({ primary, onNav }) => ( onNav ? '#fff': primary ? '#000d1a' : '#0c3a4b')};
    white-space: nowrap;
    outline: none;
    border: none;
    min-width: 100px;
    max-width: 200px;
    text-decoration: none;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    padding: ${({ big }) => (big ? '16px 40px' : '5px')};
    color: ${({ primary, onNav }) => (  onNav ? '#0c3a4b' : primary ? '#fff' : '#fff')};
    font-size: ${({big}) => (big ? '20px' : '15px')};
    font-weight: 700;
    
    &:hover {
        transform: translateY(-2px);
    }
`