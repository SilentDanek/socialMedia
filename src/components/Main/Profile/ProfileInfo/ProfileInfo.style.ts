import { styled } from "@mui/material/styles";
import { ThemeBox } from "../../../common";


export const ProfileContainer = styled(ThemeBox)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        margin: 0,
    },
    [theme.breakpoints.up('md')]: {
        margin: "2px 15% 0 17%",
    },
    [theme.breakpoints.up('lg')]: {
        margin: "2px 20% 0 25%",
    },
    padding: "2%",
    maxWidth: "100%",
}));