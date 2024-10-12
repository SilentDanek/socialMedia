import { FC, useEffect, useState } from 'react';
import {
    DialogResponse,
    useGetDialogsQuery,
    useGetMessagesQuery,
    useSendMessageMutation
} from '../../../api/dialogsAPI.ts';
import { Chat, Preloader, ThemeBox } from '../../common';
import { Avatar, Stack } from '@mui/material';
import { DialogItem } from './DialogItem';
import { convertToCommonMessage } from '../../../utils';
import unknownUserSvg from '../../../assets/images/unknown-user.svg';
import { NavLink, useNavigate, useParams } from 'react-router-dom';


const Dialogs: FC = () => {
    const [selectedFriendId, setSelectedFriendId] = useState<null | number>(null);
    const { data: recentDialogs, isLoading, isFetching } = useGetDialogsQuery();

    const { friendId } = useParams();
    useEffect(() => {
        if (friendId){
            setSelectedFriendId(+friendId);
        }
    }, []);

    const navigate = useNavigate();
    const handleUserClick = (id:number) => {
        setSelectedFriendId(id);
        navigate(`/dialogs/${id}`);
    };

    if (isLoading || isFetching) {
        return <Preloader />;
    }

    const selectedFriendInfo = recentDialogs?.find((friend) => friend.id === selectedFriendId);

    return (
        <Stack direction={'row'} sx={{ height: '100%'}}>
            <ThemeBox sx={{ height: '100%', minWidth:{sm:'100px', md:"400px"}}}>
                {recentDialogs?.map((d) => <DialogItem setSelectedUser={handleUserClick} key={d.id} {...d} />)}
            </ThemeBox>

            {selectedFriendInfo && <Dialog key={friendId}
                                         selectedFriendInfo={selectedFriendInfo} />}

        </Stack>
    );
};


const Dialog: FC<DialogProps> = ({ selectedFriendInfo:{id, photos, userName} }) => {
    const { data: messages, isSuccess, isError } = useGetMessagesQuery({ userId: id, count: 10 });
    const [sendMessage, { isLoading: isMessageSending }] = useSendMessageMutation();

    if (!isSuccess) {
        //todo return skeleton before success
        return null;
    }

    const convertedMessages = convertToCommonMessage(messages);

    const handleSendMessage = (newMessage: string) => {
        sendMessage({ body: newMessage, userId: id || -1 });
    };

    return <Chat blockSubmitButton={isMessageSending}
                 sendMessage={handleSendMessage}
                 error={isError}
                 messages={convertedMessages}
                 chatHeader={
                     <ThemeBox sx={{ p:1}}>
                         <NavLink to={`/profile/${id}`}
                                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 1 }}>
                             <Avatar src={photos.large || unknownUserSvg}/>
                             {userName}
                         </NavLink>
                     </ThemeBox>
                 }
    />
};

type DialogProps = {
    selectedFriendInfo: DialogResponse;
}


export default Dialogs;