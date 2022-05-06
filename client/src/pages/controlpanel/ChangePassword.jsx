import { useState } from "react";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const handleAdornment = (handleFor, isPasswordHidden, setIsPasswordHidden) => {
    return (
        <InputAdornment position="start" >
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

const ChangePassword = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState({
        oldPassword: true,
        newPassword: true,
        newPasswordConfirm: true,
    });

    const [form, setForm] = useState({});

    const handleSubmit = e => {
        e.preventDefault()
        console.log(form);
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "0 auto", display: "block" }}>
            <h1 className="text-4xl text-center mb-8"> Change Password </h1>
            {
                ["oldPassword", "newPassword", "newPasswordConfirm"].map((input, i) => {
                    return (
                        <TextField
                            key={i}
                            type={isPasswordHidden[input] ? "password" : "text"}
                            InputProps={{
                                endAdornment: (
                                    handleAdornment(input, isPasswordHidden, setIsPasswordHidden)
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