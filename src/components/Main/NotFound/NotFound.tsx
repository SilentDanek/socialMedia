import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeBox } from '@components/common';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
    const { t } = useTranslation('notFound');
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <ThemeBox
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: 2
            }}
        >
            <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
                404...
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                {t('page not found')}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoHome}>
                {t('return to home')}
            </Button>
        </ThemeBox>
    );
};
