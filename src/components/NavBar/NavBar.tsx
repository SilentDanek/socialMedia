import { FC } from 'react';
import { Avatar, Badge, ListItem, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {
    Nav,
    NavBarList,
    NavBarListItemButton,
    NavBarListItemIcon,
    NavBarListItemText
} from './NavBar.styles.tsx';
import { SettingsMenu } from './SettingsMenu';
import { useAuthNavbarSync } from './useAuthNavbarSync';
import { useTranslation } from 'react-i18next';
import { Chat, Group, Person, Public } from '@mui/icons-material';

export const NavBar: FC = () => {
    const { selectedIndex, navbarItems } = useAuthNavbarSync();

    return (
        <Nav>
            <Paper sx={{ height: { xs: 'auto', sm: '100%' } }}>
                <NavBarList>
                    {navbarItems.map((item, index) => (
                        <NavItem
                            key={index}
                            item={item}
                            index={index}
                            selectedIndex={selectedIndex}
                        />
                    ))}
                    <SettingsMenu />
                </NavBarList>
            </Paper>
        </Nav>
    );
};

const NavItem: FC<NavItemProps> = ({ item, index, selectedIndex }) => {
    const { t } = useTranslation('navbar');
    const iconMap = {
        users: <Group />,
        chat: <Public />,
        dialogs: <Chat />,
        profile: <Person />
    };
    const badgeCount = item.badge || 0;
    return (
        <ListItem sx={{ padding: '7px' }}>
            <NavLink to={item.route} style={{ width: '100%' }}>
                <NavBarListItemButton selected={selectedIndex === index}>
                    <Badge badgeContent={badgeCount >= 10 ? '+9' : badgeCount} color="error">
                        <NavBarListItemIcon className="icon">
                            {item.icon ? (
                                <Avatar src={item.icon} sx={{ height: 27, width: 27 }} />
                            ) : (
                                iconMap[item.text as keyof typeof iconMap]
                            )}
                        </NavBarListItemIcon>
                    </Badge>
                    <NavBarListItemText primary={t(item.text)} />
                </NavBarListItemButton>
            </NavLink>
        </ListItem>
    );
};

type ListItem = {
    text: string;
    route: string;
    icon?: string | null;
    badge?: number;
};
type NavItemProps = {
    item: ListItem;
    index: number;
    selectedIndex: number;
};
