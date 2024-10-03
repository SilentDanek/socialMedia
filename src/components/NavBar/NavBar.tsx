import { FC, ReactNode, useState } from "react";
import { getAuthStatus, getAuthUserId, useAppSelector } from "../../redux/";
import { ListItem, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Nav, NavBarList, NavBarListItemButton, NavBarListItemIcon, NavBarListItemText } from "./NavItemComponents";
import { SettingsMenu } from "./SettingsMenu";
import { useTranslation } from "react-i18next";
import { useProtectedRoutes } from "./useProtectedRoutes";

export const NavBar: FC = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const id = useAppSelector(getAuthUserId);

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const { t } = useTranslation("navbar");
    const navbarItems = useProtectedRoutes(isAuth, id, t);

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <Nav>
            <Paper sx={{ height: { xs: "auto", sm: "100%" } }}>
                <NavBarList>
                    {navbarItems.map((item, index) => (
                        <NavItem key={item.text}
                                 item={item}
                                 index={index}
                                 selectedIndex={selectedIndex}
                                 handleListItemClick={handleListItemClick} />
                    ))}
                    <SettingsMenu/>
                </NavBarList>
            </Paper>
        </Nav>
    );
};

const NavItem:FC<NavItemProps> = ({ item, index, selectedIndex, handleListItemClick }) => {
    return (
        <ListItem disablePadding sx={{ padding: "7px"}}>
            <NavLink to={item.route} onClick={() => handleListItemClick(index)} style={{ width: "100%" }}>
                <NavBarListItemButton selected={selectedIndex === index && !item.route.includes("/login")} sx={{paddingLeft:"15%"}}>
                    <NavBarListItemIcon className="icon">
                        {item.icon}
                    </NavBarListItemIcon>
                    <NavBarListItemText primary={item.text} />
                </NavBarListItemButton>
            </NavLink>
        </ListItem>
    );
};

type ListItem = {
    text: string
    icon: ReactNode
    route: string
}
type NavItemProps = {
    item:ListItem
    index:number
    selectedIndex:number
    handleListItemClick: (index:number) => void
}