import { FC, useState } from 'react';
import { useGetDialogsQuery, useGetMessagesQuery, useSendMessageMutation } from '../../../api/dialogsAPI.ts';
import { Chat, Preloader, ThemeBox } from '../../common';
import { Stack } from '@mui/material';
import { DialogItem } from './DialogItem/DialogItem.tsx';
import { convertToCommonMessage } from '../../../utils';

const Dialogs: FC = () => {
    const [selectedUserId, setSelectedUserId] = useState<null | number>(null);

    const { data: recentDialogs, isLoading, isFetching } = useGetDialogsQuery();

    if (isLoading || isFetching) {
        return <Preloader />;
    }

    // @ts-ignore
    return (
        <Stack direction={'row'} sx={{ height: '100%' }}>
            <ThemeBox sx={{ flexBasis: '400px', height: '100%' }}>
                {recentDialogs?.map((d) => <DialogItem setSelectedUser={setSelectedUserId} key={d.id} {...d} />)}
            </ThemeBox>

            {
                selectedUserId && <DialogsWithSelectedUser key={selectedUserId} selectedUserId={selectedUserId} />
            }
        </Stack>
    );
};

const DialogsWithSelectedUser = ({ selectedUserId }: any) => {
    const { data: messages, isSuccess, isError } = useGetMessagesQuery({ userId: selectedUserId, count: 10});
    const [sendMessage, { isLoading: isMessageSending }] = useSendMessageMutation();

    if(!isSuccess){
        //todo return skeleton before success
        return null;
    }

    const convertedMessages = convertToCommonMessage(messages);

    const handleSendMessage = (newMessage: string) => {
        sendMessage({ body: newMessage, userId: selectedUserId || -1 });
    };

    return <Chat blockSubmitButton={isMessageSending}
                 sendMessage={handleSendMessage}
                 error={isError}
                 messages={convertedMessages}
    />;
};

export default Dialogs;