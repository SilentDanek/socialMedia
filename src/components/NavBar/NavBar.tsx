import { FC, ReactNode, useState } from "react";
import { getAuthUserId, useAppSelector } from "../../redux/";
import { ListItem, Paper } from "@mui/material";
import { Chat, Group, Person } from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";
import { NavLink } from "react-router-dom";
import { Nav, NavBarList, NavBarListItemButton, NavBarListItemIcon, NavBarListItemText } from "./NavItemComponents";
import { SettingsMenu } from "./SettingsMenu";
import { useTranslation } from "react-i18next";

export const NavBar: FC = () => {
    const id = useAppSelector(getAuthUserId);
    const { t } = useTranslation("navbar");

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const listItems = [
        { text: t("users"), icon: <Group />, route: "/users" },
        { text: t("chat"), icon: <PublicIcon />, route: "/chat" },
        { text: t("dialogs"), icon: <Chat />, route: `/dialogs` },
        { text: t("profile"), icon: <Person />, route: `/profile/${id}` }
    ];

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <Nav>
            <Paper sx={{ height: { xs: "auto", sm: "100%" } }}>
                <NavBarList>
                    {listItems.map((item, index) => (
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
        <ListItem disablePadding sx={{ padding: "7px" }}>
            <NavLink to={item.route} onClick={() => handleListItemClick(index)} style={{ width: "100%" }}>
                <NavBarListItemButton selected={selectedIndex === index}>
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