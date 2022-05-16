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

const Navbar = () => {
    const {themeMode, setThemeMode} = useContext(ThemeModeSwitcher);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [searchKey, setSearchKey] = useState("");
    const navigate = useNavigate();
    const pageList = [
        {
            name: "All",
            path: "/article",
        },
        {
            name: "Art",
            path: "/article/Art",
        },
        {
            name: "Business",
            path: "/article/Business",
        },
        {
            name: "Interview",
            path: "/article/Interview",
        },
        {
            name: "Travel",
            path: "/article/Travel",
        },
    ]

    const handleSearchSubmit = e => {
        e.preventDefault()
        setIsDialogOpen(false);
        setSearchKey("");

        if(!searchKey) return toast.error("search ต้องไม่เป็นค่าว่าง");
        navigate(`/search?search=${searchKey}`)
    }

    window.addEventListener("scroll", () => setScrollHeight(window.pageYOffset))

    return (
        <CustomNavbar scroll_height={scrollHeight}>
            <Toaster toastOptions={{style: { zIndex: 99999999999, }}} />
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
                    <IconButton color="light" onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon />
                    </IconButton>
                    {/* <Switch  /> */}
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