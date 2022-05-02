import { useState } from "react";
import { Toolbar, Box, List, Drawer, Divider, ListItem, Button, IconButton, Typography, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

import { CustomNavbar, CustomSideBar } from "./../style/sidebar.style";
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(0);
    const pageList = [
        {
            name: "Home Home Home",
            path: "/",
        },
        {
            name: "Article Article",
            path: "/article",
        },
    ]

    window.addEventListener("scroll", () => setScrollHeight(window.pageYOffset))

    return (
        <CustomNavbar scroll_height={scrollHeight}>
            <Toolbar>
                <Typography variant="h5" component={Link} to="/">
                    LOGO
                </Typography>
                <Box className="ml-auto">
                    <Button sx={{ mx: 2 }} variant="outlined" color="light"> LOGIN </Button>
                    <Button variant="outlined" color="light"> REGISTER </Button>

                    <IconButton color="light" sx={{ ml: 3 }} onClick={() => setIsSidebarOpen(true)} >
                        <FormatAlignRightIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            <Drawer
                anchor="right"
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            >
                <CustomSideBar>
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