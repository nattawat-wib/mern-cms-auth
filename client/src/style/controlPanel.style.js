import { Drawer } from "@mui/material";
import styled from "styled-components";

export const PermanentSideBar = styled(Drawer)`
    & .MuiPaper-root {
        width: ${({ is_sidebar_open }) => JSON.parse(is_sidebar_open) ? "250px" : "65px"};
        transition: .3s ease;
        overflow: hidden;
    }
    
    & .MuiListItemText-root {
        opacity: ${({ is_sidebar_open }) => JSON.parse(is_sidebar_open) ? 1 : 0};
        white-space: nowrap;
        transition: .3s ease;
    }
`

