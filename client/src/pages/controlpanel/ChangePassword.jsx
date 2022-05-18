import { useState, useContext } from "react";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { mainContext } from "../../App";
import axios from "axios";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast, { Toaster } from "react-hot-toast";

const handleInputAdornment = (handleFor, isPasswordHidden, setIsPasswordHidden) => {
    return (
        <InputAdornment position="end" >
            <IconButton
                onClick={() => {
                    setIsPasswordHidden({
                        ...isPasswordHidden,
                        [handleFor]: isPasswordHidden[handleFor] ? false : true
                    })
                }}
            >
                { isPasswordHidden[handleFor] ? <VisibilityOffIcon /> : <VisibilityIcon /> }
            </IconButton>
        </InputAdornment>
    )
}

const ChangePassword = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState({
        oldPassword: true,
        newPassword: true,
        newPasswordConfirm: true,
    });
    const { setAuth } = useContext(mainContext);
    const [form, setForm] = useState({});

    const handleSubmit = e => {
        e.preventDefault()
        toast.loading("pending...");

        axios.post(`${process.env.REACT_APP_BASE_API}/api/member/change-password`, form ,{ withCredentials: true })
            .then(resp => {
                toast.dismiss();
                toast.success(resp.data.msg);
                
                setTimeout(() => {
                    setAuth(null)
                }, 2000);
            })
            .catch(resp => {
                toast.dismiss();
                toast.error(resp.response.data.msg);
            })
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "0 auto", display: "block" }}>
            <Toaster />
            <h1 className="text-4xl text-center mb-8"> Change Password </h1>
            {
                ["oldPassword", "newPassword", "newPasswordConfirm"].map((input, i) => {
                    return (
                        <TextField
                            key={i}
                            type={isPasswordHidden[input] ? "password" : "text"}
                            InputProps={{
                                endAdornment: (
                                    handleInputAdornment(input, isPasswordHidden, setIsPasswordHidden)
                                )
                            }}
                            onChange={e => setForm({ ...form, [input]: e.target.value })}
                            label={input}
                            className="mb-8"
                            fullWidth
                        />
                    )
                })
            }
            <div className="text-center">
                <Button type="submit" variant="contained" className="bg-primary"> Submit </Button>
            </div>
        </form>
    )
}

export default ChangePassword