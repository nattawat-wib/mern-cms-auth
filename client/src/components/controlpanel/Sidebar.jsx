import { useContext } from "react";
import { mainContext } from "../../App";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import ArticleIcon from '@mui/icons-material/Article';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';

import { PermanentSideBar } from "../../style/controlPanel.style";

const Sidebar = prop => {
    const { isSidebarOpen, setIsSidebarOpen } = prop;
    const { setAuth } = useContext(mainContext);

    const handleLogout = () => {
        axios.get(`${process.env.REACT_APP_BASE_API}/api/member/logout`, { withCredentials: true })
            .then(resp => {
                setAuth(null);
                toast.success(resp.data.msg);
            })
            .catch(err => {
                toast.dismiss()
                toast.error(err.response.data.msg);
            })
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