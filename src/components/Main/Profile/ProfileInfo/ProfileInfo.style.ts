import { styled } from "@mui/material/styles";
import { ThemeBox } from "../../../common";


export const ProfileContainer = styled(ThemeBox)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        margin: 0,
    },
    margin:'auto',
    padding: "2%",

    maxHeight:'100%',
    overflowY:'auto',
    maxWidth: "750px",
}));