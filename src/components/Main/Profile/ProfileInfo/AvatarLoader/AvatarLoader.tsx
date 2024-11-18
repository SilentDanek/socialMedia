import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ChangeEvent, FC, ReactNode, useRef } from 'react';
import { boundThunks } from '@/redux';
import { LoadNewAvatarButton } from '@components/Main/Profile/ProfileInfo/AvatarLoader/AvatarLoader.styles.tsx';

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

            <LoadNewAvatarButton onClick={handleAvatarClick}>
                <EditIcon />
            </LoadNewAvatarButton>
        </Box>
    );
};
