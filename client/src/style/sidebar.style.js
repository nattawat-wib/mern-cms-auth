import styled from "styled-components";
import { AppBar, Box } from "@mui/material";

export const CustomNavbar = styled(AppBar)`
    ${({ scroll_height }) => scroll_height < 10 ?
        `
        background-color: transparent;
        box-shadow: none;
        ` : `
        background-color: rgba(33,37,41, .75);
        backdrop-filter: blur(5px);
        box-shadow: 0 0 24px rgba(0,0,0,.52);
        `
    }
    transition: .5s ease;
`

export const CustomSideBar = styled(Box)`
    padding: 1rem;
    background-color: #212529;
    height: 100%;
`