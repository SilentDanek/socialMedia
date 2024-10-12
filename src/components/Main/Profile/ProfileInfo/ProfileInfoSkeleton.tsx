import { FC } from 'react';
import { Box, Stack } from '@mui/material';
import { ProfileContainer } from './ProfileInfo.style';
import { Skeleton } from '@mui/material';
import { ProfileDataSkeleton } from './ProfileData';


export const ProfileInfoSkeleton: FC = () => {
    return (
        <ProfileContainer>
            <Stack direction="row" alignItems="center" gap="4%">
                <Box>
                    <Skeleton variant="circular" width={120} height={120} />
                </Box>
                <Stack width={"100%"}>
                    <Skeleton variant="text" height={50} sx={{width:'90%', maxWidth:'300px'}}/>
                    <Skeleton variant="text" height={25} sx={{width:'80%', maxWidth:'270px'}}/>
                    <Skeleton variant="rounded" width={150} height={40} sx={{marginTop:2}}/>
                </Stack>
            </Stack>
            <ProfileDataSkeleton/>
        </ProfileContainer>
    );
};