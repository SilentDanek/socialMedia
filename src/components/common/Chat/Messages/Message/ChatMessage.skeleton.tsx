import { FC } from 'react';
import { Skeleton } from '@mui/material';
import { RandMessage } from '../ChatMessages.skeleton.tsx';
import { MessageContent, MessageWrapper } from './ChatMessage.styles.tsx';

export const ChatMessageSkeleton: FC<ChatMessageSkeletonProps> = ({
    userName,
    isMessageOwnerRand,
    withAvatar
}) => {
    return (
        <MessageWrapper isMessageOwner={isMessageOwnerRand}>
            {withAvatar && <Skeleton variant="circular" width={40} height={40} />}

            <MessageContent isMessageOwner={isMessageOwnerRand} sx={{ minWidth: userName }}>
                <Skeleton height={15} width={userName} />
                <Skeleton height={30} width="100%" />
            </MessageContent>
        </MessageWrapper>
    );
};

type ChatMessageSkeletonProps = { withAvatar: boolean } & RandMessage;
