import { Photos } from '../../../../redux';
import { FC } from 'react';
import { useGetMessagesQuery, useSendMessageMutation } from '../../../../api/dialogsAPI.ts';
import unknownUserSvg from '../../../../assets/images/unknown-user.svg';

type MessageProps = {
    id: number;
    photos: Photos;
    userName: string;
    lastMessage: string;
    lastMessageDate: string;
    lastDialogActivityDate: string;
    lastUserActivityDate: string;
    hasNewMessages: boolean;
    newMessagesCount: number;
}

export const Messages: FC<MessageProps> = ({ photos, userName, id }) => {
    const {data:message, isSuccess} = useGetMessagesQuery({ userId:id, page:1,count:1 });
    const [sendMessage] = useSendMessageMutation();

    return <div>
        <div style={{ display: 'flex'}}>
            <img src={photos.small || unknownUserSvg} width={100} alt="123321" />
            <span>{userName}</span>
            {isSuccess &&
                <span>{message?.items[0].body}</span>
            }
            <button onClick={() => sendMessage({ userId: 1079, body: 'test' })}>Send to test</button>
            <button onClick={() => sendMessage({ userId: 31483, body: 'test' })}>Send to me</button>
        </div>
    </div>
}
