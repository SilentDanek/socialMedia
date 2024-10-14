import { Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

export const Legend: FC<LegendProps> = ({ children }) => {
    return (
        <Typography
            component="legend"
            variant="subtitle1"
            sx={{ fontWeight: 'bold', marginBottom: 1 }}
        >
            {children}
        </Typography>
    );
};

type LegendProps = {
    children?: ReactNode;
};
