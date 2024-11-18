import { styled } from '@mui/system';
import { IconButton } from '@mui/material';

export const LoadNewAvatarButton = styled(IconButton)(() => ({
    position: 'absolute',
    bottom: 0,
    right: '36%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    cursor: 'pointer'
}));
