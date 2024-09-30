import { useState } from "react";
import { useCustomTheme } from "../../theme";
import { bindedThunks, getAuthStatus, useAppSelector } from "../../redux";
import { Box, ListItem, Menu, MenuItem, Typography } from "@mui/material";
import { NavBarListItemButton, NavBarListItemIcon, NavBarListItemText } from "./NavItemComponents";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
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
                <ChangeThemeButton />
                <ChangeLanguageButton />
                {isAuth && <LogoutButton />}
            </Menu>
        </ListItem>
    );
}

const ChangeLanguageButton = () => {
    return (
        <MenuItem>
            <LanguageIcon/>
            <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                Language
            </Typography>
        </MenuItem>
    );
};


const LogoutButton = () => {
    const { logout } = bindedThunks.authThunks;
    return (
        <MenuItem onClick={logout} >
            <LogoutIcon/>
            <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                Logout
            </Typography>
        </MenuItem>
    );
};

const ChangeThemeButton = () => {
    const { toggleTheme, themeMode } = useCustomTheme();

    return (<MenuItem onClick={() => toggleTheme()} >
            {
                themeMode === "light"
                    ? <WbSunnyIcon/>
                    : <NightsStayIcon/>
            }
            <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                Theme
            </Typography>
        </MenuItem>
    );
};

