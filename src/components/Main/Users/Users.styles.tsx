import { styled } from '@mui/material/styles';
import { ThemeBox } from '../../common';
import { CardProps } from '@mui/material';

export const UsersWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    gap: '6px',
    overflowY: 'auto'
}));

export const UserTable = styled(ThemeBox)<CardProps>(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '60%',
    padding: 13
}));

export const UsersSection = styled('section')(() => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
}));
