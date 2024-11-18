import { styled } from '@mui/system';
import { ThemeBox } from '@components/common';
import { NavLink } from 'react-router-dom';
import { BoxProps } from '@mui/material';

export const ChatHeader = styled(ThemeBox)<BoxProps>(() => ({
    padding: 6
}));

export const ProfileNavLink = styled(NavLink)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10
}));
