import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Nav = styled('nav')(({ theme }) => ({
    background: "#512da8",
    borderRight: "gray 3px solid",
    [theme.breakpoints.down('lg')]: {
        width:"auto",
    },
    [theme.breakpoints.up('lg')]: {
        width:"260px",
    },
}));

export const NavBarList = styled(List)(({ theme }) => ({
    display: 'flex',
    padding: "0px",
    [theme.breakpoints.down('xs')]: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
}));

export const NavBarListItemIcon = styled(ListItemIcon)(() => ({
    minWidth: "24px"
}));

export const NavBarListItemButton = styled(ListItemButton)(() => ({
    justifyContent: "center",
    borderRadius: "8px",
    "&:hover .icon": {
        transform: "scale(1.2)",
        transition: "transform 0.3s ease-in-out"
    }
}));

export const NavBarListItemText = styled(ListItemText)(({ theme }) => ({
    marginLeft:"10%",
    [theme.breakpoints.down('lg')]: {
        display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
        display: 'block',
    },
}));