import { FC, useState } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { i18n as i18nType, TFunction } from 'i18next';
import GBFlagIcon from '../../../../assets/images/gb.svg';
import UAFlagIcon from '../../../../assets/images/ua.svg';

type Props = {
    t: TFunction<'translation', undefined>;
    i18n?: i18nType;
};

export const ChangeLangButton: FC<Props> = ({ t, i18n }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const languages = [
        { flagSrc: GBFlagIcon, LangName: 'English', langTag: 'en' },
        { flagSrc: UAFlagIcon, LangName: 'Українська', langTag: 'ua' },
    ];

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleLanguageChange = (lng: string) => {
        if (i18n) {
            localStorage.setItem('language', lng);
            i18n.changeLanguage(lng);
        }
    };

    return (
        <>
            <MenuItem onClick={handleMenuClick}>
                <LanguageIcon />
                <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                    {t('language')}
                </Typography>
            </MenuItem>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setOpen(false)}
            >
                {languages.map((language) => (
                    <LanguageMenuItem
                        key={language.langTag}
                        handleLanguageChange={handleLanguageChange}
                        {...language}
                    />
                ))}
            </Menu>
        </>
    );
};

export const LanguageMenuItem: FC<LanguageMenuItemProps> = ({
    handleLanguageChange,
    flagSrc,
    LangName,
    langTag,
}) => {
    return (
        <MenuItem onClick={() => handleLanguageChange(langTag)}>
            <img src={flagSrc} height="17px" alt={LangName + ' flag'} />
            <span style={{ marginLeft: '8px' }}>{LangName}</span>
        </MenuItem>
    );
};

type LanguageMenuItemProps = {
    handleLanguageChange: (lng: string) => void;
    flagSrc: string;
    LangName: string;
    langTag: string;
};
