import { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, TextField, Button, IconButton } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Navigate } from "react-router-dom";

const LoginBg = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: rgb(0,135,213);
    background: linear-gradient(90deg, rgba(0,135,213,1) 25%, rgba(0,212,255,1) 71% );

    background-size: 200% 200%;
    animation: gradient 7s ease infinite;
    
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
       }
        50% {
            background-position: 100% 50%;
       }
        100% {
            background-position: 0% 50%;
       }
   }    
`

const LoginForm = styled.form`
    width: 100%;
    max-width: 500px;
    // min-height: 500px;
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 7px;
    // border: 5px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin: 2rem;
    animation: fade-down 2s ease;

    @keyframes fade-down {
        0% {
            transform: translateY(-50px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
       }
   }        
`

const LoginButton = styled(Button)`
   background-color: #fff;
   border-radius: 99px;
   max-width: 150px;
   width: 100%;
`

const Login = () => {
    const [loginFrom, setLoginForm] = useState({})
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")) navigate("/cp/article")
    }, [])    

    const handleLogin = e => {
        e.preventDefault();
        toast.loading("pending...");

        axios.post(`${process.env.REACT_APP_BASE_API}/api/member/login`, loginFrom, {withCredentials: true})
            .then(resp => {                
                toast.dismiss();
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("member", JSON.stringify(resp.data.data));
                toast.success(resp.data.msg);
                setTimeout(() => {
                    navigate("/cp/article");
                }, 2000)
            })
            .catch(resp => {
                toast.dismiss();
                localStorage.removeItem("token");
                localStorage.removeItem("member");
                toast.error(resp.response.data.msg);
            })
    }

    return (
        <LoginBg>
            <Toaster />
            <LoginForm onSubmit={handleLogin}>
                <Typography className="text-4xl" color="light.main"> Only For Admin !!! </Typography>
                <div className="my-16">
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle color="light" />
                                </InputAdornment>
                            )
                        }}
                        focused
                        sx={{ input: { color: '#fff' }, py: 1, mb: 4 }}
                        onChange={e => setLoginForm({ ...loginFrom, username: e.target.value })}
                        variant="outlined"
                        color="light"
                        fullWidth
                        label="username"
                    />
                    <TextField
                        type={isPasswordHidden ? "password" : "text"}
                        focused
                        onChange={e => setLoginForm({ ...loginFrom, password: e.target.value })}
                        variant="outlined"
                        color="light"
                        sx={{ input: { color: '#fff' } }}
                        fullWidth
                        label="password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <KeyIcon color="light" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton onClick={() => setIsPasswordHidden(isPasswordHidden ? false : true)}>
                                        {
                                            isPasswordHidden ?
                                                <VisibilityOffIcon color="light" />
                                                :
                                                <VisibilityIcon color="light" />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <LoginButton type="submit" size="large"> Submit </LoginButton>
            </LoginForm>
        </LoginBg>
    )
}

export default Login