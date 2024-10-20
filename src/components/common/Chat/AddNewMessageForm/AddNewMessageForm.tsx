import { CircularProgress, IconButton, Paper, TextFieldProps } from '@mui/material';
import { EmojiEmotions, Send } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';
import { ControlledTextField } from '../../ControlledElements';

export const AddNewMessageForm: FC<AddNewMessageFormProps> = ({
    sendMessage,
    blockSubmitButton
}) => {
    const { handleSubmit, control, resetField } = useForm<FieldValues>({
        defaultValues: { newMessage: '' }
    });
    const { t } = useTranslation('chat');

    const handleSendMessage = ({ newMessage }: FieldValues) => {
        sendMessage(newMessage);
        resetField('newMessage');
    };

    const handleSendMessageByEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(handleSendMessage)();
        }
    };

    return (
        <Paper elevation={3} sx={{ borderRadius: '25px' }}>
            <form
                aria-label="Message form"
                onSubmit={handleSubmit(handleSendMessage)}
                style={{ width: '100%', display: 'flex' }}
            >
                <IconButton>
                    <EmojiEmotions />
                </IconButton>

                <ControlledTextField
                    name="newMessage"
                    control={control}
                    rules={{ required: true }}
                    multiline
                    maxRows={6}
                    placeholder={t('message')}
                    autoComplete="off"
                    slotProps={{
                        input: { sx: { '& fieldset': { border: 'none' } } }
                    }}
                    onKeyDown={handleSendMessageByEnter}
                />
                <IconButton type="submit" disabled={blockSubmitButton} aria-label="Send message">
                    {blockSubmitButton ? <CircularProgress /> : <Send />}
                </IconButton>
            </form>
        </Paper>
    );
};

type AddNewMessageFormProps = {
    sendMessage: (newMessage: string) => void;
    blockSubmitButton: boolean;
} & TextFieldProps;

type FieldValues = {
    newMessage: string;
};
