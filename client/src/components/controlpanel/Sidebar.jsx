import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";

import ArticleIcon from '@mui/icons-material/Article';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';

const PermanentSideBar = styled(Drawer)`
    & .MuiPaper-root {
        width: ${({ is_sidebar_open }) => JSON.parse(is_sidebar_open) ? "250px" : "65px"};
        transition: .3s ease;
    }

    & .MuiListItemText-root {
        opacity: ${({ is_sidebar_open }) => JSON.parse(is_sidebar_open) ? 1 : 0};
        white-space: nowrap;
        transition: .3s ease;
    }
`

const Sidebar = prop => {
    const { isSidebarOpen, setIsSidebarOpen } = prop;
    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("member");
        toast.success("Logout Successfully");
        navigate("/cp");
    }

    return (
        <PermanentSideBar
            variant="permanent"
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            is_sidebar_open={isSidebarOpen.toString()}
        >
            <Toaster />
            <Box className="flex items-center justify-center" sx={{ height: "80px" }}>
                <h1> LOGO </h1>
            </Box>
            <List className="px-4">
                <ListItem className="px-1" component={Link} to="/cp/article">
                    <ListItemIcon>
                        <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText primary="All Article" />
                </ListItem>
                <ListItem className="px-1" component={Link} to="/cp/article/add">
                    <ListItemIcon>
                        <AddBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Article" />
                </ListItem>

                <Divider />

                <ListItem className="px-1" component={Link} to="/cp/member/add">
                    <ListItemIcon>
                        <AddReactionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Member" />
                </ListItem>
                <ListItem className="px-1" component={Link} to="/cp/member/edit-password">
                    <ListItemIcon>
                        <LockResetIcon />
                    </ListItemIcon>
                    <ListItemText primary="Change Password" />
                </ListItem>
                <ListItem className="px-1" onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>

        </PermanentSideBar>
    )
}

export default Sidebar;