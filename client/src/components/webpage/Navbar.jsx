import { useState, useContext } from "react";
import { ThemeModeSwitcher } from "../../App";
import { Toolbar, Box, List, Drawer, ListItem, IconButton, Typography, ListItemText, Switch, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import { CustomNavbar, CustomSideBar } from "./../../style/sidebar.style";
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import styled from "styled-components";

// const ThemeModeToggle = styled(Switch)`
//     height: 48px;
//     width: 70px;
//     padding: 9px;

//     .MuiSwitch-switchBase {
//         top: 50%;
//         transform: translate(5px, -50%);

//         &.Mui-checked {
//             transform: translate(calc(100% - 10px), -50%) !important;
//         }
//     }

//     .MuiSwitch-track {
//         border-radius: 99px;
//         position: relative;

//         &::before {
//             ${ ({ theme_mode }) => theme_mode === "light" ?
//                 ` content: url("https://p.kindpng.com/picc/s/148-1489616_-hd-png-download.png")   
//                 left: 5px; `
//                 :
//                 // ` content: "dark";
//                 ` content: " <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LightModeIcon"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path></svg> ";
//                 right: 5px; `
//             }
//             color: #fff;
//             position: absolute;
//             top: 41%;
//             transform: translateY(-50%);
//             width: 100%;
//             height: 20px;
//         }
//     }
// `

const Navbar = () => {
    const { themeMode, setThemeMode } = useContext(ThemeModeSwitcher);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [searchKey, setSearchKey] = useState("");
    const navigate = useNavigate();
    const pageList = [
        { name: "Home", path: "/" },
        { name: "All", path: "/article", },
        { name: "Art", path: "/article/Art", },
        { name: "Business", path: "/article/Business", },
        { name: "Interview", path: "/article/Interview", },
        { name: "Travel", path: "/article/Travel", },
    ]

    const handleSearchSubmit = e => {
        e.preventDefault()
        setIsDialogOpen(false);
        setSearchKey("");

        if (!searchKey) return toast.error("search ต้องไม่เป็นค่าว่าง");
        navigate(`/search?search=${searchKey}`)
    }

    window.addEventListener("scroll", () => setScrollHeight(window.pageYOffset))

    return (
        <CustomNavbar scroll_height={scrollHeight}>
            <Toaster toastOptions={{ style: { zIndex: 99999999999, } }} />
            <Toolbar className="justify-between">
                <Link to="/">
                    <img src="/images/logo.png" alt="" width="90px" />
                </Link>
                <List className="hidden lg:flex whitespace-nowrap">
                    {
                        pageList.map((page, i) => {
                            return (
                                <ListItem
                                    onClick={() => setIsSidebarOpen(false)}
                                    button
                                    component={Link}
                                    to={page.path}
                                    key={i}
                                    sx={{ px: 3, color: "light.main" }}
                                >
                                    <ListItemText primary={page.name} />
                                </ListItem>
                            )
                        })
                    }
                </List>

                <Box>
                    <IconButton onClick={() => setThemeMode(prev => prev === "light" ? "dark" : "light")}>
                        {
                            themeMode === "light" ?
                                <LightModeIcon color="light" />
                                :
                                <NightlightIcon color="light" />
                        }
                    </IconButton>
                    {/* <ThemeModeToggle theme_mode={themeMode} onChange={() => setThemeMode(prev => prev === "light" ? "dark" : "light")} /> */}
                    <IconButton color="light" onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton className="inline lg:hidden" color="light" sx={{ ml: 2 }} onClick={() => setIsSidebarOpen(true)} >
                        <FormatAlignRightIcon />
                    </IconButton>
                </Box>

            </Toolbar>
            <Drawer
                anchor="right"
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            >
                <CustomSideBar width={200}>
                    <IconButton sx={{ color: "light.main", ml: "auto", display: "block" }} onClick={() => setIsSidebarOpen(false)} >
                        <CloseIcon />
                    </IconButton>
                    <List>
                        {pageList.map((page, i) => {
                            return (
                                <ListItem
                                    onClick={() => setIsSidebarOpen(false)}
                                    button
                                    component={Link}
                                    to={page.path}
                                    key={i}
                                    sx={{ px: 1, color: "light.main" }}
                                >
                                    <ListItemText primary={page.name} />
                                </ListItem>
                            )
                        })}
                    </List>
                </CustomSideBar>
            </Drawer>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth={"lg"}>
                <form onSubmit={handleSearchSubmit}>
                    <DialogContent>
                        <TextField label="search" variant="standard" fullWidth onChange={e => setSearchKey(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsDialogOpen(false)}> cancel </Button>
                        <Button type="submit"> search </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </CustomNavbar>
    )
}

export default Navbar