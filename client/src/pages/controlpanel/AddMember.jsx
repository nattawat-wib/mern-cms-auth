import { useState } from "react";
import axios from "axios";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const handleInputAdornment = (handleFor, isPasswordHidden, setIsPasswordHidden) => {
    return (
        <InputAdornment position="end">
            <IconButton
                onClick={() => {
                    setIsPasswordHidden({
                        ...isPasswordHidden,
                        [handleFor]: isPasswordHidden[handleFor] ? false : true
                    })
                }}
            >
                {
                    isPasswordHidden[handleFor] ?
                        <VisibilityOffIcon />
                        :
                        <VisibilityIcon />
                }
            </IconButton>
        </InputAdornment>
    )
}

const AddMember = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState({
        password: true,
        passwordConfirm: true
    })
    const [form, setForm] = useState({
        username: "",
        password: "",
        passwordConfirm: ""
    });
    const handleSubmit = e => {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_BASE_API}/api/member/register`, form)
            .then(resp => {
                toast.dismiss();
                toast.success(resp.data.msg);
                setForm({
                    username: "",
                    password: "",
                    passwordConfirm: ""
                })
            })
            .catch(resp => {
                toast.error(resp.response.data.msg);
            })

    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "0 auto", display: "block" }}>
            <Toaster />
            <h1 className="text-4xl text-center mb-8"> Add Member </h1>
            <TextField
                value={form.username}
                label="Username"
                name="Username"
                className="mb-8"
                fullWidth
                onChange={e => setForm({ ...form, username: e.target.value })}
            />

            <TextField
                value={form.password}
                label="Password"
                name="Password"
                className="mb-8"
                fullWidth
                onChange={e => setForm({ ...form, password: e.target.value })}
                type={isPasswordHidden.password ? "password" : "text"}
                InputProps={{
                    endAdornment: handleInputAdornment("password", isPasswordHidden, setIsPasswordHidden)
                }}
            />

            <TextField
                value={form.passwordConfirm}
                label="Password Confirm"
                name="Password Confirm"
                className="mb-8"
                fullWidth
                onChange={e => setForm({ ...form, passwordConfirm: e.target.value })}
                type={isPasswordHidden.passwordConfirm ? "password" : "text"}
                InputProps={{
                    endAdornment: handleInputAdornment("passwordConfirm", isPasswordHidden, setIsPasswordHidden)
                }}
            />

            <div className="text-center">
                <Button type="submit" variant="contained" className="bg-primary"> Submit </Button>
            </div>
        </form>
    )
}

export default AddMember