import { FC, useCallback, useEffect, useState } from 'react';
import { useGetDialogsQuery } from '@api/dialogsAPI.ts';
import { DialogItem } from './DialogItem';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from './Dialog';
import { DialogItemsWrapper, DialogWrapper } from '@components/Main/Dialogs/Dialogs.styles.tsx';
import { DialogsMeta } from '@components/Main/Dialogs/Dialogs.meta.tsx';

const Dialogs: FC = () => {
    const [selectedFriendId, setSelectedFriendId] = useState<null | number>(null);
    const { data: recentDialogs } = useGetDialogsQuery(undefined, {
        pollingInterval: 5000,
        refetchOnMountOrArgChange: true
    });

    const { friendId } = useParams();

    // if the page was loaded with query parameters,
    // then we need to show a dialog with the user
    useEffect(() => {
        if (friendId) {
            setSelectedFriendId(+friendId);
        }
    }, []);

    // We can get this info only if send ajax request or get from dialogs
    // + less request to server
    // - more calculation
    const selectedFriendInfo = recentDialogs?.find((friend) => friend.id === selectedFriendId);

    const navigate = useNavigate();
    const handleUserClick = useCallback((id: number) => {
        setSelectedFriendId(id);
        navigate(`/dialogs/${id}`);
    }, []);

    return (
        <>
            <DialogsMeta />

            <DialogWrapper>
                <DialogItemsWrapper>
                    {recentDialogs?.map((d) => (
                        <DialogItem
                            key={d.id}
                            setSelectedUser={handleUserClick}
                            selectedFriendId={selectedFriendId}
                            {...d}
                        />
                    ))}
                </DialogItemsWrapper>

                {selectedFriendInfo && <Dialog selectedFriendInfo={selectedFriendInfo} />}
            </DialogWrapper>
        </>
    );
};

export default Dialogs;
