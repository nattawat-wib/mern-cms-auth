import { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const AppBarLinear = styled(AppBar)`
    background: rgb(0,135,213);
    background: linear-gradient(90deg, rgba(0,135,213,1) 25%, rgba(0,212,255,1) 71% );
    z-index: 1201;
    width: ${({ is_sidebar_open }) => JSON.parse(is_sidebar_open) ? "calc(100% - 250px)" : "100%"};
    transition: .3s ease;
    margin-left: auto;
`

const Navbar = prop => {
    const [dropdownParent, setDropdownParent] = useState(null);
    const open = Boolean(dropdownParent);
    const { isSidebarOpen, setIsSidebarOpen } = prop;

    return (
        <AppBarLinear position="sticky" color="dark" is_sidebar_open={isSidebarOpen.toString()}>
            <Toolbar className="justify-between" >
                <IconButton edge="start" onClick={() => setIsSidebarOpen(isSidebarOpen ? false : true)}>
                    {
                        isSidebarOpen ?
                            <CloseIcon color="light" />
                            :
                            <MenuIcon color="light" />
                    }
                </IconButton>

                <Button
                    color="light"
                    onClick={e => setDropdownParent(e.currentTarget)}
                >
                    Admin
                </Button>

                <Menu
                    open={open}
                    anchorEl={dropdownParent}
                    onClose={() => setDropdownParent(null)}
                >
                    <MenuItem onClick={() => setDropdownParent(null)} component={Link} to="/cp/member/add"> Add Member </MenuItem>
                    <MenuItem onClick={() => setDropdownParent(null)} component={Link} to="/cp/member/edit-password"> Change Password </MenuItem>
                    <MenuItem> Logout </MenuItem>
                </Menu>
            </Toolbar>
        </AppBarLinear>
    )
}

export default Navbar;