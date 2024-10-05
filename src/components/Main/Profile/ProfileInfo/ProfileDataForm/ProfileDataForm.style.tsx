import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const ButtonGroupWrapper = styled(Box)(() => ({
    display:"flex",
    justifyContent:"space-between"
}));

export const CancelButton = styled(Button)(() => ({
    color:"secondary",
    variant:"contained",
    width:"10%"
}));

export const SaveButton = styled(Button)(() => ({
    type:"submit",
    color:"primary",
    variant:"contained",
    width:"15%"
}));