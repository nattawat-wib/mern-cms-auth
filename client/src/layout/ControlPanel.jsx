import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./../components/controlpanel/Sidebar";
import Navbar from "./../components/controlpanel/Navbar";
import styled from "styled-components";
// import jwt from "jsonwebtoken";

const PageWrapper = styled(Box)`
    width: ${({ is_sidebar_open }) => JSON.parse(is_sidebar_open) ? "calc(100% - 250px)" : "calc(100% - 65px)"};
    transition: .3s ease;
    margin-left: auto;
    min-height: calc(100vh - 64px);
    background-color: #f5f5f5;
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content:center;
`

const CardWrapper = styled.div`
    border-radius: 14px;
    background-color: #fff;
    box-shadow: 0 0 24px 0 rgba(0,0,0,.12);
    padding: 2rem;
    width: 100%;
`

const isAuth = () => {
    // jwt.verify("")
    const token = localStorage.getItem("token");
    // console.log(token);
    
    return token
}

const ControlPanel = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [member, setMember] = useState();
    
    useEffect(() => {
        if(isAuth()) {
            setMember(JSON.parse(localStorage.getItem("token")))
        } else {
            navigate("/cp")
        }
    }, [])

    return (
        <>
            <Navbar member={member} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <PageWrapper is_sidebar_open={isSidebarOpen}>
                <CardWrapper>
                    <Outlet />
                </CardWrapper>
            </PageWrapper>
        </>
    )
}

export default ControlPanel;