import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { useState } from "react";
import { Buffer } from "buffer";
import { api } from "./axiosConfig";
import { logIn } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/hooks";

export function LoginDialog(props: {openLogin: boolean, setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>}) {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameErrorText, setUsernameErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setUsernameError(false);
        setPasswordError(false);
        setUsernameErrorText('');
        setPasswordErrorText('');
        props.setOpenLogin(false);
    }

    const handleSubmit = async () => {
        var error = false;
        const response = await api.post("/api/public/checkCredentials", {
            username: username, password: password
        });
        var data = [response.data][0];
        if(data.includes("USERNAME_INCORRECT")) {
            error = true;
            setUsernameError(true);
            setUsernameErrorText('Username incorrect');
        } else {
            setUsernameError(false);
            setUsernameErrorText('');
        }
        if(data.includes("PASSWORD_INCORRECT")) {
            error = true;
            setPasswordError(true);
            setPasswordErrorText('Password incorrect');
        } else {
            setPasswordError(false);
            setPasswordErrorText('');
        }
        if(!error) {
            localStorage.setItem("token", Buffer.from(username+":"+password).toString('base64'));
            dispatch(logIn());
            handleClose();
        }
    }

    return(
        <Dialog
            open={props.openLogin}
            onClose={handleClose}
        >
            <DialogContent>
                <div>
                    <TextField 
                        error={usernameError}
                        sx={{margin: "5px"}}
                        label="Username" 
                        variant="outlined" 
                        value={username} 
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value);} } 
                        required 
                        helperText={usernameErrorText}
                    />
                </div>
                <div>
                    <TextField 
                        error={passwordError}
                        sx={{margin: "5px"}}
                        label="Password" 
                        variant="outlined" 
                        value={password} 
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value);} } 
                        type="password"
                        required 
                        helperText={passwordErrorText}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}
