import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Nav = styled('nav')(({ theme }) => ({
    background: '#512da8',
    width: '260px',
    borderRight: 'gray 2px solid',
    borderTop: 'none',
    [theme.breakpoints.down('lg')]: {
        width: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
        borderRight: 'none',
        borderTop: 'gray 2px solid'
    }
}));

export const NavBarList = styled(List)(({ theme }) => ({
    display: 'flex',
    padding: '0px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
}));

export const NavBarListItemIcon = styled(ListItemIcon)(() => ({
    minWidth: '24px'
}));

export const NavBarListItemButton = styled(ListItemButton)(({ theme }) => ({
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: '8px',
    paddingLeft: '15%',
    [theme.breakpoints.down('lg')]: {
        paddingLeft: '16px'
    },
    '&:hover .icon': {
        transform: 'scale(1.2)',
        transition: 'transform 0.3s ease-in-out'
    }
}));

export const NavBarListItemText = styled(ListItemText)(({ theme }) => ({
    marginLeft: '10%',
    display: 'block',
    [theme.breakpoints.down('lg')]: {
        display: 'none'
    }
}));
