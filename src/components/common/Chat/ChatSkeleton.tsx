import { Skeleton, Stack } from '@mui/material';
import { AddNewMessageForm } from './AddNewMessageForm/AddNewMessageForm.tsx';
import  { FC } from 'react';
import { ChatMessagesSkeleton } from './Messages';
import { ThemeBox } from '../ThemeBox/ThemeBox.tsx';

export const ChatSkeleton: FC<{withAvatar:boolean; withHeader:boolean}> = ({ withAvatar, withHeader }) => {
    return (
        <Stack flexDirection="column" height={'100%'} sx={{ maxWidth: 1000, width:"100%", margin: 'auto'}}>
            {withHeader && <ThemeBox sx={{ p: 1 }}>
                    <Skeleton variant={'circular'} width={35} height={35}/>
                </ThemeBox>
            }

            <ChatMessagesSkeleton withAvatar={withAvatar}/>
            <AddNewMessageForm sendMessage={() => {return}} blockSubmitButton={true}/>
        </Stack>);
};