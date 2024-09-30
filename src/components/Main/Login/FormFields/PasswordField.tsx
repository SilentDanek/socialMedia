import { Control, Controller, useFormState } from "react-hook-form";
import { LoginFieldValues } from "../Login";
import { FC, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type EmailField = {
    control: Control<LoginFieldValues, unknown>
}

export const PasswordField:FC<EmailField> = ({control}) => {
    const {errors} = useFormState({control});
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
            minLength: { value: 4, message: "Min password length is 4" },
            required: "Password is required"
        }}
        render={({ field }) => (
            <TextField
                {...field}
                label="Password"
                type={showPassword ? "text" : "password"}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        )}
    />
}