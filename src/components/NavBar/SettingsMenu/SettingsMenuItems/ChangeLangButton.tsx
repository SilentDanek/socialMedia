import { FC, useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { i18n as i18nType, TFunction } from "i18next";
import GBFlagIcon from "../../../../assets/flags/gb.svg";
import UAFlagIcon from "../../../../assets/flags/ua.svg";

type Props = {
    t: TFunction<"translation", undefined>
    i18n?: i18nType;
}

export const ChangeLangButton: FC<Props> = ({ t, i18n }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const languages = [
        { flagSrc: GBFlagIcon, LangName: "English", langTag: "en" },
        { flagSrc: UAFlagIcon, LangName: "Українська", langTag: "ua" }
    ];

    const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const changeLanguageHandler = (lng: string) => {
        if (i18n) {
            i18n.changeLanguage(lng);
        }
    };

    return (
        <>
            <MenuItem onClick={clickHandler}>
                <LanguageIcon />
                <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                    {t("language")}
                </Typography>
            </MenuItem>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setOpen(false)}>
                {languages.map((language) => <LanguageMenuItem
                    changeLanguageHandler={changeLanguageHandler} {...language} />)}
            </Menu>
        </>
    );
};


export const LanguageMenuItem: FC<LanguageMenuItemProps> = ({ changeLanguageHandler, flagSrc, LangName, langTag }) => {
    return <MenuItem onClick={() => changeLanguageHandler(langTag)}>
        <img src={flagSrc} height="17px" alt={LangName + " flag"} />
        <span style={{marginLeft:"8px"}}>{LangName}</span>
    </MenuItem>;
};

type LanguageMenuItemProps = {
    changeLanguageHandler: (lng: string) => void
    flagSrc: string
    LangName: string
    langTag: string
}
