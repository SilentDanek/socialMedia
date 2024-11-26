import { FC, useState } from 'react';
import { MessagesWrapper } from './ChatMessages.styles.tsx';
import { ChatMessageSkeleton } from './Message';
import { generateRandomPercentage } from '@/utils';
import { useAutoScroll } from '@/hooks';

export const ChatMessagesSkeleton: FC<{ withAvatar: boolean }> = ({ withAvatar }) => {
    const [randMessages] = useState<RandMessage[]>(
        Array(15)
            .fill(0)
            .map(() => ({
                userName: generateRandomPercentage(20, 50),
                isMessageOwnerRand: Boolean(Math.random() < 0.5)
            }))
    );
    const { handleScroll, autoScrollRef } = useAutoScroll(randMessages);

    return (
        <MessagesWrapper onScroll={handleScroll}>
            {randMessages.map((rm, i) => (
                <ChatMessageSkeleton key={i} withAvatar={withAvatar} {...rm} />
            ))}
            <div ref={autoScrollRef} />
        </MessagesWrapper>
    );
};

export type RandMessage = {
    userName: string;
    isMessageOwnerRand: boolean;
};
