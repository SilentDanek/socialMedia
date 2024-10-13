import { FC } from 'react';
import { useChatMessages } from './useChatMessages.ts';
import { Chat, ThemeBox } from '../../../common';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';
import unknownUserSvg from '../../../../assets/images/unknown-user.svg';
import { DialogResponse } from '../../../../api/dialogsAPI.ts';

export const Dialog: FC<DialogProps> = ({ selectedFriendInfo: { id, photos, userName } }) => {
    const {
        chatMessages,
        isError,
        isSuccess,
        isMessageSending,
        handleScroll,
        handleSendMessage
    } = useChatMessages(id);

    if (!isSuccess) {
        //todo return skeleton before success
        return null;
    }

    return <Chat blockSubmitButton={isMessageSending}
                 sendMessage={handleSendMessage}
                 error={isError}
                 messages={chatMessages}
                 onScroll={handleScroll}
                 chatHeader={
                     <ThemeBox sx={{ p: 1 }}>
                         <NavLink to={`/profile/${id}`}
                                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 1 }}>
                             <Avatar src={photos.large || unknownUserSvg} />
                             {userName}
                         </NavLink>
                     </ThemeBox>
                 }
    />;
};

type DialogProps = {
    selectedFriendInfo: DialogResponse;
}
