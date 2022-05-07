import { useState } from "react";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";

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
    const [form, setForm] = useState({});
    const handleSubmit = e => {
        e.preventDefault()
        console.log(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-4xl text-center mb-8"> Add Member </h1>
            <TextField
                label="Username"
                name="Username"
                className="mb-8"
                fullWidth
                onChange={e => setForm({ ...form, username: e.target.value })}
            />

            <TextField
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