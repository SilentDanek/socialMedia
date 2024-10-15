import { FC, ReactNode } from 'react';
import { Badge, ListItem, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {
    Nav,
    NavBarList,
    NavBarListItemButton,
    NavBarListItemIcon,
    NavBarListItemText
} from './NavBar.styles.tsx';
import { SettingsMenu } from './SettingsMenu';
import { useProtectedRoutes } from './useProtectedRoutes';

export const NavBar: FC = () => {
    const { selectedIndex, navbarItems } = useProtectedRoutes();

    return (
        <Nav>
            <Paper sx={{ height: { xs: 'auto', sm: '100%' } }}>
                <NavBarList>
                    {navbarItems.map((item, index) => (
                        <NavItem item={item} index={index} selectedIndex={selectedIndex} />
                    ))}
                    <SettingsMenu />
                </NavBarList>
            </Paper>
        </Nav>
    );
};

const NavItem: FC<NavItemProps> = ({ item, index, selectedIndex }) => {
    const badgeCount = item.badge || 0;

    return (
        <ListItem sx={{ padding: '7px' }}>
            <NavLink to={item.route} style={{ width: '100%' }}>
                <NavBarListItemButton selected={selectedIndex === index}>
                    <Badge badgeContent={badgeCount >= 10 ? '+9' : badgeCount} color="error">
                        <NavBarListItemIcon className="icon">{item.icon}</NavBarListItemIcon>
                    </Badge>
                    <NavBarListItemText primary={item.text} />
                </NavBarListItemButton>
            </NavLink>
        </ListItem>
    );
};

type ListItem = {
    text: string;
    icon: ReactNode;
    route: string;
    badge?: number;
};
type NavItemProps = {
    item: ListItem;
    index: number;
    selectedIndex: number;
};
