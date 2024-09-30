import { useState } from "react";
import { useCustomTheme } from "../../theme";
import { Box, ListItem, Menu, MenuItem, Typography } from "@mui/material";
import { NavBarListItemButton, NavBarListItemIcon, NavBarListItemText } from "./NavItemComponents";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { bindedThunks, getAuthStatus, useAppSelector } from "../../redux";
import LanguageIcon from "@mui/icons-material/Language";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export const SettingsBurger = ({ index, selectedIndex }: any) => {
    const isAuth = useAppSelector(getAuthStatus);

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    return (
        <ListItem disablePadding sx={{ padding: "7px" }}>
            <Box sx={{ width: "100%" }}>
                <NavBarListItemButton selected={selectedIndex === index} onClick={clickHandler}>
                    <NavBarListItemIcon>
                        <SettingsIcon />
                    </NavBarListItemIcon>
                    <NavBarListItemText primary={"Settings"} />
                </NavBarListItemButton>
            </Box>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setOpen(false)}>
                <MenuItem><ChangeThemeButton /></MenuItem>
                <MenuItem><LanguageIcon /></MenuItem>
                {isAuth && <MenuItem><LogoutButton /></MenuItem>}
            </Menu>
        </ListItem>
    );
};

const LogoutButton = () => {
    const { logout } = bindedThunks.authThunks;
    return (
        <>
            <LogoutIcon onClick={logout} />
            <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                Logout
            </Typography>
        </>
    );
};

const ChangeThemeButton = () => {
    const { toggleTheme, themeMode } = useCustomTheme();

    return (<>
            {
                themeMode === "light"
                    ? <WbSunnyIcon onClick={() => toggleTheme()} />
                    : <NightsStayIcon onClick={() => toggleTheme()} />
            }
        </>
    );
};

