import { FC } from 'react';
import { MenuItem, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { useCustomTheme } from '../../../../hooks/useCustomTheme.ts';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';

type ChangeThemeButtonProps = {
    t: TFunction<'translation', undefined>;
};

export const ChangeThemeButton: FC<ChangeThemeButtonProps> = ({ t }) => {
    const { toggleTheme, themeMode } = useCustomTheme();

    return (
        <MenuItem onClick={() => toggleTheme()}>
            {themeMode === 'light' ? <WbSunnyIcon /> : <NightsStayIcon />}
            <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                {t('theme')}
            </Typography>
        </MenuItem>
    );
};
