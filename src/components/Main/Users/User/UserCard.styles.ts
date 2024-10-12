import { styled } from "@mui/material/styles";
import { Card, CardActions, CardActionsProps, CardContent, CardContentProps } from '@mui/material';

export const StyledUserCard = styled(Card)(() => ({
    width: "100%",
    margin: "15px auto",
    padding: 5,
    display: "flex",
    flexWrap:'wrap',
    flexDirection: "row",
    alignItems: "center"
}));

export const UserCardContent = styled(CardContent)<CardContentProps>(() => ({
    flexGrow: 7, flexBasis: "200px"
}));


export const UserCardActions = styled(CardActions)<CardActionsProps>(() => ({
    display: "flex",
    flexGrow: 1,
    gap:5,
    flexBasis: "200px",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap:'wrap',
}));