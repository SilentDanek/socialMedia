import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";

type LegendProps = {
    children?: ReactNode;
}

export const Legend: FC<LegendProps> = ({ children }) => {
    return <Typography
        component="legend"
        variant="subtitle1"
        sx={{ fontWeight: "bold", marginBottom: 1 }}
    >
        {children}
    </Typography>;
};