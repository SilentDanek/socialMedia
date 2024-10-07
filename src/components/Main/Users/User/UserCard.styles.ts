import { styled } from "@mui/material/styles";
import { Card, CardActions, CardContent, CardContentProps } from "@mui/material";

export const StyledUserCard = styled(Card)(() => ({
    width: "100%",
    margin: "15px auto",
    padding: 5,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center"
}));

export const UserCardContent = styled(CardContent)<CardContentProps>(() => ({
    flexGrow: 1, flexBasis: "200px"
}));


export const UserCardActions = styled(CardActions)(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down('sm')]: {
        width: "300px",
    },
}));