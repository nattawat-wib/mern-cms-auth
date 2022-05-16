import { useState, useEffect, useContext } from "react";
import { mainContext } from "../App";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Paper } from "@mui/material";
import Sidebar from "./../components/controlpanel/Sidebar";
import Navbar from "./../components/controlpanel/Navbar";
import styled from "styled-components";
import axios from "axios";

const PageWrapper = styled(Paper)`
    width: ${({ is_sidebar_open }) => JSON.parse(is_sidebar_open) ? "calc(100% - 250px)" : "calc(100% - 65px)"};
    transition: .3s ease;
    margin-left: auto;
    min-height: calc(100vh - 64px);
    background-color: ${({ theme_mode }) => theme_mode === "light" ? "#f5f5f5" : "#333"};
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content:center;
`

const CardWrapper = styled(Paper)`
    border-radius: 14px;
    box-shadow: 0 0 24px 0 rgba(0,0,0,.12);
    padding: 2rem;
    width: 100%;
`

const ControlPanel = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { themeMode, auth, setAuth } = useContext(mainContext);
    
    useEffect(() => {        
        console.log("useEffect controlpanel")
        axios.get(`${process.env.REACT_APP_BASE_API}/api/member/verify-token`, { withCredentials: true })
            .then(resp => setAuth(resp.data.data))
            .catch(err => {
                console.log("not login");
                navigate("/cp");
                setAuth(null)
            })
    }, [])

    if(!auth && location.pathname !== "/cp") {
        console.log(1);
        navigate("/cp");
    } else if(auth && location.pathname === "/cp") {
        console.log(2);
        navigate("/cp/article");
    }    

    console.log("auth", auth);    
    console.log("pathname", location.pathname);    

    return (
        <>
            {
                location.pathname !== "/cp" ?
                <>
                    <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                    <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                    <PageWrapper is_sidebar_open={isSidebarOpen.toString()} theme_mode={themeMode}>
                        <CardWrapper>
                            <Outlet />
                        </CardWrapper>
                    </PageWrapper>
                </>
                :
                <Outlet />
            }
        </>
    )
}

export default ControlPanel;