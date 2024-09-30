import { FC, useState } from "react";
import { getAuthUserId, useAppSelector } from "../../redux/";
import { ListItem, Paper } from "@mui/material";
import { Chat, Group, Person } from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";
import { NavLink } from "react-router-dom";
import { Nav, NavBarList, NavBarListItemButton, NavBarListItemIcon, NavBarListItemText } from "./NavItemComponents";
import { SettingsBurger } from "./SettingMenu";

export const NavBar: FC = () => {
    const id = useAppSelector(getAuthUserId);

    const [selectedIndex, setSelectedIndex] = useState<number>();

    const listItems = [
        { text: "Users", icon: <Group />, route: "/users" },
        { text: "Chat", icon: <PublicIcon />, route: "/chat" },
        { text: "Dialogs", icon: <Chat />, route: `/dialogs` },
        { text: "Profile", icon: <Person />, route: `/profile/${id}` }
    ];

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <Nav>
            <Paper sx={{ height: { xs: "auto", sm: "100%" } }}>
                <NavBarList>
                    {listItems.map((item, index) => (
                        <NavItem item={item} index={index} selectedIndex={selectedIndex}
                                 handleListItemClick={handleListItemClick} />
                    ))}
                    <SettingsBurger index={listItems.length} selectedIndex={selectedIndex} />
                </NavBarList>
            </Paper>
        </Nav>
    );
};


const NavItem = ({ item, index, selectedIndex, handleListItemClick }: any) => {
    return (
        <ListItem key={item.text} disablePadding sx={{ padding: "7px" }}>
            <NavLink to={item.route} onClick={handleListItemClick} style={{ width: "100%" }}>
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