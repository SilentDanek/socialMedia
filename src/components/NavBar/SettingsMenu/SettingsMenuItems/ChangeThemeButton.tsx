import { FC } from "react";
import { MenuItem, Typography } from "@mui/material";
import { TFunction } from "i18next";
import { useCustomTheme } from "../../../../theme";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";

type Props = {
    t: TFunction<"translation", undefined>
}

export const ChangeThemeButton: FC<Props> = ({ t }) => {
    const { toggleTheme, themeMode } = useCustomTheme();

    return (<MenuItem onClick={() => toggleTheme()}>
            {
                themeMode === "light"
                    ? <WbSunnyIcon />
                    : <NightsStayIcon />
            }
            <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                {t("theme")}
            </Typography>
        </MenuItem>
    );
};