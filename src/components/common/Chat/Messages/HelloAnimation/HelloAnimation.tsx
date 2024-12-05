import Lottie from 'lottie-react';
import animation from '@assets/hello-animation.json';
import { HelloAnimationStyles } from './HelloAnimation.styles.tsx';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const HelloAnimation = () => {
    const { t } = useTranslation('dialogs');
    return (
        <HelloAnimationStyles>
            <Lottie animationData={animation} />
            <Typography textAlign="center" variant="body1">
                {t('greeting phrase')}
            </Typography>
        </HelloAnimationStyles>
    );
};
