import { FC, useState } from 'react';
import { useGetDialogsQuery, useGetMessagesQuery, useSendMessageMutation } from '../../../api/dialogsAPI.ts';
import { Preloader, ThemeBox } from '../../common';
import { Stack } from '@mui/material';
import { DialogItem } from './DialogItem/DialogItem.tsx';
import { AddNewMessageForm } from '../../common/AddNewMessageForm/AddNewMessageForm.tsx';
import { getAuthUserId, useAppSelector } from '../../../redux';


const Dialogs: FC = () => {
    const { data: recentDialogs, isLoading } = useGetDialogsQuery();
    const [selectedUser, setSelectedUser] = useState<null | number>(null);
    console.log(selectedUser);
    if (isLoading) {
        return <Preloader />;
    }

    return (
        <Stack direction={'row'} sx={{ height: '100%' }}>
            <ThemeBox sx={{ flexBasis: '400px', height: '100%' }}>
                {recentDialogs?.map((d) => <DialogItem setSelectedUser={setSelectedUser} key={d.id} {...d} />)}
            </ThemeBox>
            {
                selectedUser && <A selectedUser={selectedUser}/>
            }
        </Stack>
    );
};

const A = ({ selectedUser }: any) => {

    const userId = useAppSelector(getAuthUserId);
    const { data: messages, isSuccess } = useGetMessagesQuery({ userId: selectedUser, count:10 });
    const [sendMessage, {isSuccess: isMessageSent}] = useSendMessageMutation();
    console.log(messages);

    const handleSendMessage = (newMessage:string) => {
        sendMessage({body:newMessage, userId:userId || -1});
    }

    return (<ThemeBox sx={{ flex: 1, height: '100%' }}>
        {
            isSuccess &&
                <>
                    <AddNewMessageForm blockSubmit={!isMessageSent} sendMessage={handleSendMessage}/>
                </>
        }
        </ThemeBox>
    );
};

export default Dialogs;