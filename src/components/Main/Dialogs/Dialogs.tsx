import { FC, useCallback, useEffect, useState } from 'react';
import { useGetDialogsQuery } from '../../../api/dialogsAPI.ts';
import { ThemeBox } from '../../common';
import { Stack } from '@mui/material';
import { DialogItem } from './DialogItem';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from './Dialog';

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
        <Stack direction="row" sx={{ height: '100%' }}>
            <ThemeBox
                sx={{
                    height: '100%',
                    overflowY: 'auto',
                    minWidth: { xs: '100px', smDown: '100px', md: '400px' }
                }}
            >
                {recentDialogs?.map((d) => (
                    <DialogItem
                        key={d.id}
                        setSelectedUser={handleUserClick}
                        selectedFriendId={selectedFriendId}
                        {...d}
                    />
                ))}
            </ThemeBox>

            {selectedFriendInfo && <Dialog selectedFriendInfo={selectedFriendInfo} />}
        </Stack>
    );
};

export default Dialogs;
