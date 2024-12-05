import { styled } from '@mui/material/styles';
import { ThemeBox } from '@components/common';

export const HelloAnimationStyles = styled(ThemeBox)(() => ({
    maxWidth: '280px',
    alignSelf: 'center',
    marginTop: '25%',
    padding: '20px',
    borderRadius: '25px',
    opacity: 0,
    animation: 'fadeIn 1s forwards',
    '@keyframes fadeIn': {
        from: { opacity: 0, transform: 'scale(0.9)' },
        to: { opacity: 1, transform: 'scale(1)' }
    }
}));
