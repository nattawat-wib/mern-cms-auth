import { useState } from "react";
import { Toolbar, Box, List, Drawer, Divider, ListItem, Button, IconButton, Typography, ListItemText, Switch } from "@mui/material";
import { Link } from "react-router-dom";

import { CustomNavbar, CustomSideBar } from "./../style/sidebar.style";
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(0);
    const pageList = [
        {
            name: "All",
            path: "/",
        },
        {
            name: "Art",
            path: "/article",
        },
        {
            name: "Business",
            path: "/article",
        },
        {
            name: "Interview",
            path: "/article",
        },
        {
            name: "Travel",
            path: "/article",
        },
    ]

    window.addEventListener("scroll", () => setScrollHeight(window.pageYOffset))

    return (
        <CustomNavbar scroll_height={scrollHeight}>
            <Toolbar className="justify-between">
                <Typography variant="h5" component={Link} to="/">
                    LOGO
                </Typography>

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
                    {/* <Button sx={{ mx: 2 }} variant="outlined" color="light"> LOGIN </Button>
                    <Button variant="outlined" color="light"> REGISTER </Button> */}
                    <IconButton color="light">
                        <SearchIcon />
                    </IconButton>
                    <Switch />

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
                        {
                            pageList.map((page, i) => {
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
                            })
                        }
                    </List>

                </CustomSideBar>
            </Drawer>
        </CustomNavbar>
    )
}

export default Navbar