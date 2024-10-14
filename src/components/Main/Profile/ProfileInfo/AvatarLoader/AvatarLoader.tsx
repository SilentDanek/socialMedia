import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ChangeEvent, FC, ReactNode, useRef } from 'react';
import { boundThunks } from '../../../../../redux';

type AvatarLoaderProps = {
    children: ReactNode;
};

export const AvatarLoader: FC<AvatarLoaderProps> = ({ children }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { updatePhoto } = boundThunks.profileThunks;

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleUpdatePhotoOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files.length) return;

        const file = new FormData();
        file.append('image', e.target.files[0]);

        updatePhoto(file);
    };

    return (
        <Box sx={{ position: 'relative' }}>
            {children}

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUpdatePhotoOnChange}
                style={{ display: 'none' }}
            />

            <IconButton
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: '36%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    cursor: 'pointer'
                }}
                onClick={handleAvatarClick}
            >
                <EditIcon />
            </IconButton>
        </Box>
    );
};
