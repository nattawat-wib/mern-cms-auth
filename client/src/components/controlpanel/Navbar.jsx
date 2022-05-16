import { useState, useContext } from "react";
import { ThemeModeSwitcher } from "../../App";
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';

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
    const navigate = useNavigate();
    const { themeMode, setThemeMode } = useContext(ThemeModeSwitcher);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("member");
        toast.success("Logout Successfully");
        navigate("/cp");
    }

    return (
        <AppBarLinear position="sticky" color="dark" is_sidebar_open={isSidebarOpen.toString()}>
            <Toaster />
            <Toolbar className="justify-between" >
                <IconButton edge="start" onClick={() => setIsSidebarOpen(isSidebarOpen ? false : true)}>
                    {
                        isSidebarOpen ?
                            <CloseIcon color="light" />
                            :
                            <MenuIcon color="light" />
                    }
                </IconButton>
                <Box>
                    <Button color="light" variant="outlined" component={Link} to="/">
                        Back to Webpage
                    </Button>

                    <IconButton sx={{ml: 2}} onClick={() => setThemeMode(prev => prev === "light" ? "dark" : "light")}>
                        {
                            themeMode === "light" ?
                            <LightModeIcon color="light" />
                            :
                            <NightlightIcon color="light" />
                        }
                    </IconButton>

                    <Button
                        color="light"
                        onClick={e => setDropdownParent(e.currentTarget)}
                    >
                        { prop.member ? prop.member.username : "Member" }
                    </Button>

                    <Menu
                        open={open}
                        anchorEl={dropdownParent}
                        onClose={() => setDropdownParent(null)}
                    >
                        <MenuItem onClick={() => setDropdownParent(null)} component={Link} to="/cp/member/add"> Add Member </MenuItem>
                        <MenuItem onClick={() => setDropdownParent(null)} component={Link} to="/cp/member/edit-password"> Change Password </MenuItem>
                        <MenuItem onClick={handleLogout}> Logout </MenuItem>
                    </Menu>
                </Box>

            </Toolbar>
        </AppBarLinear>
    )
}

export default Navbar;