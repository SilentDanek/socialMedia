import { styled } from '@mui/system';
import { Box, Link, Theme, Typography } from '@mui/material';
import React from 'react';

export const FieldsetLike = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
    border: `1px solid gray`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0, 0),
    position: 'relative'
}));

export const LegendLike = styled(Typography)(({ theme }: { theme: Theme }) => ({
    position: 'absolute',
    top: '-17px',
    left: '10px',
    fontSize: '1.2em',
    border: '1px solid gray',
    borderRadius: theme.shape.borderRadius,
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: theme.palette.background.default,
    padding: '0 4px'
}));

export const FlexLink = styled(Link)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    wordBreak: 'break-all',
    whiteSpace: 'normal'
}));
