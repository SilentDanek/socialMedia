import { FC } from 'react';
import { Box, List, ListItem } from '@mui/material';
import { FieldsetLike, LegendLike } from './ProfileData.style.ts';
import { Skeleton } from '@mui/material';

export const ProfileDataSkeleton: FC = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Skeleton variant="text" height={40} sx={{ width: '70%', maxWidth: '270px' }} />
            <Skeleton variant="text" height={40} sx={{ width: '75%', maxWidth: '310px' }} />
            <Skeleton variant="text" height={40} sx={{ width: '80%', maxWidth: '340px' }} />

            <FieldsetLike>
                <LegendLike>
                    <Skeleton variant="text" width={80} height={40} />
                </LegendLike>
                <List disablePadding={true}>
                    {Array(8)
                        .fill(0)
                        .map((_, i) => (
                            <ListItem disablePadding key={i}>
                                <Skeleton variant="text" width={270} height={40} />
                            </ListItem>
                        ))}
                </List>
            </FieldsetLike>
        </Box>
    );
};
