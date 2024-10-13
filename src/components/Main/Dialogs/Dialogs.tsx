import { FC, useEffect, useState } from 'react';
import { useGetDialogsQuery } from '../../../api/dialogsAPI.ts';
import { Preloader, ThemeBox } from '../../common';
import { Stack } from '@mui/material';
import { DialogItem } from './DialogItem';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from './Dialog';


const Dialogs: FC = () => {
    const [selectedFriendId, setSelectedFriendId] = useState<null | number>(null);
    const { data: recentDialogs, isLoading, isFetching } = useGetDialogsQuery();

    const { friendId } = useParams();
    useEffect(() => {
        if (friendId) {
            setSelectedFriendId(+friendId);
        }
    }, []);

    const navigate = useNavigate();
    const handleUserClick = (id: number) => {
        setSelectedFriendId(id);
        navigate(`/dialogs/${id}`);
    };

    if (isLoading || isFetching) {
        return <Preloader />;
    }

    const selectedFriendInfo = recentDialogs?.find((friend) => friend.id === selectedFriendId);

    return (
        <Stack direction={'row'} sx={{ height: '100%' }}>
            <ThemeBox
                sx={{ height: '100%', overflowY: 'auto', minWidth: { xs: '100px', smDown: '100px', md: '400px' } }}>
                {recentDialogs?.map((d) => <DialogItem setSelectedUser={handleUserClick} key={d.id} {...d} />)}
            </ThemeBox>

            {selectedFriendInfo && <Dialog selectedFriendInfo={selectedFriendInfo} />}

        </Stack>
    );
};



export default Dialogs;