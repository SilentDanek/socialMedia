import { FC, useEffect, useState } from "react";
import { bindedThunks, getAuthStatus, getAuthUserId, getCaptchaUrl, useAppSelector } from "../../../redux";
import { useNavigate } from "react-router-dom";
import { Controller, useForm, useFormState } from "react-hook-form";
import { FormError } from "../../../api/Errors";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeBox } from "../../common/ThemeBox";

type FieldValues = {
    captcha: string;
    rememberMe: boolean;
    email: string;
    password: string;
    formError: string;
}
const Login: FC = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const id = useAppSelector(getAuthUserId);
    const captchaUrl = useAppSelector(getCaptchaUrl);

    const { login } = bindedThunks.authThunks;
    const { setError, control, handleSubmit, reset } = useForm<FieldValues>();
    const { errors, isSubmitting } = useFormState<FieldValues>({ control });
    const [formErrorMessage, setFormErrorMessage] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate(`/profile/${id}`);
        }
    }, [isAuth]);


    const handleLoginSubmit = async (formData: FieldValues) => {
        try {
            setFormErrorMessage("");
            await login(formData.email, formData.password, formData.rememberMe, formData.captcha);
        } catch (error) {
            if (error instanceof FormError) {
                if (error.message.includes("anti-bot")) {
                    setError("captcha", { message: error.message });
                } else {
                    setFormErrorMessage(error.message);
                }
                reset({ captcha: "" });
            } else {
                throw error;
            }
        }
    };


    const [showPassword, setShowPassword] = useState(false);

    // Обробник для перемикання видимості пароля
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    // Обробник для запобігання події фокусування
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" height="100%">
            <ThemeBox minWidth={"300px"} maxWidth="22%" padding={"1% 1.5%"} sx={{ borderRadius: "20px" }} >
                <form onSubmit={handleSubmit(handleLoginSubmit)} style={{ margin: "6px" }}>
                    <Typography variant={"h5"} component="h1" textAlign="center">
                        Sign In
                    </Typography>

                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Email is invalid" },
                            required: "Email is required"
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="email"
                                label="Login"
                                placeholder="Email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
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
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    // Додає кнопку з "глазиком" для перемикання видимості пароля
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
                    <Controller
                        name="rememberMe"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} />}
                                label="Remember me"
                            />
                        )}
                    />

                    {captchaUrl && <Box>
                        <img src={captchaUrl} alt="captcha" width="100%" />
                        <Controller
                            name="captcha"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Captcha is required" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="text"
                                    label="Captcha"
                                    placeholder="Captcha"
                                    error={!!errors.captcha}
                                    helperText={errors.captcha?.message}
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        />
                    </Box>
                    }

                    <Typography color="red">
                        {formErrorMessage}
                    </Typography>


                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={() => reset()}
                            sx={{width:"40%"}}
                        >
                            Reset
                        </Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            loading={isSubmitting}
                            sx={{width:"50%"}}
                        >
                            Sign In
                        </LoadingButton>
                    </Box>
                </form>
            </ThemeBox>
        </Stack>
    );
};

export default Login;