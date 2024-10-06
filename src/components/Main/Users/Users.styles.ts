import { styled } from "@mui/material/styles";
import { ThemeBox } from "../../common";

export const UsersWrapper = styled("section")(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    overflowY: "auto"
}));

export const UsersSection = styled(ThemeBox)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "60%",
    padding: "1% 3%"
}));