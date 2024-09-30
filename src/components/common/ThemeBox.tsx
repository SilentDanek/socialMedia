import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ThemeBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    border: "2px solid gray",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1]
}));