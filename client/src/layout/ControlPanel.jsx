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
    const [isLoading, setIsLoading] = useState(true);
    const { themeMode, auth, setAuth } = useContext(mainContext);

    useEffect(() => {
        console.log("fx 1");
        // setIsLoading(true)

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        axios.get(`${process.env.REACT_APP_BASE_API}/api/member/verify-token`, { withCredentials: true })
            .then(resp => {
                setAuth(prev => ({ ...prev, ...resp.data.data }))
                setIsLoading(false)
            })
            .catch(err => {
                console.log("Error:" + err);
                setAuth(null)
                setIsLoading(false)
            });

        return () => source.cancel()
    }, [])

    useEffect(() => {
        console.log("fx 2");
        console.log("isLoading", isLoading);
        console.log("location.pathname", location.pathname);
        console.log("auth fx2", auth);

        if (isLoading) return;

        if ((location.pathname !== "/cp" || location.pathname !== "/cp/") && !auth) {
            console.log(1);
            navigate("/cp");
            console.log("go to /cp");
        }
        else if ((location.pathname === "/cp" || location.pathname === "/cp/") && auth) {
            console.log(2);
            navigate("/cp/article");
        }

    }, [location, isLoading])

    console.log("auth", auth);

    return (
        <>
            {
                (location.pathname === "/cp" || location.pathname === "/cp/") ?
                    <Outlet />
                    :
                    <>
                        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                        <PageWrapper is_sidebar_open={isSidebarOpen.toString()} theme_mode={themeMode}>
                            <CardWrapper>
                                <Outlet />
                            </CardWrapper>
                        </PageWrapper>
                    </>
            }
        </>
    )
}

export default ControlPanel;