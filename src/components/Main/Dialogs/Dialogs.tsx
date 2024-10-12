import { FC, useState } from 'react';
import {
    Dialog as DialogType,
    useGetDialogsQuery,
    useGetMessagesQuery,
    useSendMessageMutation
} from '../../../api/dialogsAPI.ts';
import { Chat, Preloader, ThemeBox } from '../../common';
import { Avatar, Stack } from '@mui/material';
import { DialogItem } from './DialogItem/DialogItem.tsx';
import { convertToCommonMessage } from '../../../utils';
import unknownUserSvg from '../../../assets/images/unknown-user.svg';
import { NavLink } from 'react-router-dom';


type SelectedUser = Pick<DialogType, 'id' | 'photos' | 'userName'>

const Dialogs: FC = () => {
    const [selectedUser, setSelectedUser] = useState<null | SelectedUser>(null);
    const { data: recentDialogs, isLoading, isFetching } = useGetDialogsQuery();

    if (isLoading || isFetching) {
        return <Preloader />;
    }

    return (
        <Stack direction={'row'} sx={{ height: '100%'}}>
            <ThemeBox sx={{ height: '100%', minWidth:{sm:'100px', md:"400px"}}}>
                {recentDialogs?.map((d) => <DialogItem setSelectedUser={setSelectedUser} key={d.id} {...d} />)}
            </ThemeBox>

            {selectedUser && <Dialog key={selectedUser.id}
                                     selectedUser={selectedUser}
                                     setSelectedUser={setSelectedUser} />}

        </Stack>
    );
};


const Dialog: FC<DialogProps> = ({ selectedUser }) => {
    const { data: messages, isSuccess, isError } = useGetMessagesQuery({ userId: selectedUser.id, count: 10 });
    const [sendMessage, { isLoading: isMessageSending }] = useSendMessageMutation();

    if (!isSuccess) {
        //todo return skeleton before success
        return null;
    }

    const convertedMessages = convertToCommonMessage(messages);

    const handleSendMessage = (newMessage: string) => {
        sendMessage({ body: newMessage, userId: selectedUser.id || -1 });
    };

    return <Chat blockSubmitButton={isMessageSending}
                 sendMessage={handleSendMessage}
                 error={isError}
                 messages={convertedMessages}
                 chatHeader={
                     <ThemeBox sx={{ p:1}}>
                         <NavLink to={`/profile/${selectedUser.id}`}
                                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 1 }}>
                             <Avatar src={selectedUser.photos.large || unknownUserSvg}/>
                             {selectedUser.userName}
                         </NavLink>
                     </ThemeBox>
                 }
    />
};

type DialogProps = {
    selectedUser: SelectedUser;
    setSelectedUser: any;
}


export default Dialogs;