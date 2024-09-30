import { styled } from "@mui/material/styles";
import { ThemeBox } from "../../common/ThemeBox";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";

export const FormContainer = styled(ThemeBox)(({  }) => ({
    minWidth: "300px",
    maxWidth: "22%",
    padding: "1% 1.5%",
    borderRadius: "20px",
}));

export const ResetButton = styled(Button)(({  }) => ({
    color:"secondary",
    width:"40%"
}));

export const SignInButton = styled(LoadingButton)(({  }) => ({
    type:"submit",
    variant:"contained",
    color:"primary",
    width:"50%"
}));