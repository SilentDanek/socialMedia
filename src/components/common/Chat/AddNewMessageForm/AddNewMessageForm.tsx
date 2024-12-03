import { CircularProgress, IconButton, TextFieldProps } from '@mui/material';
import { EmojiEmotions, Send } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';
import { ControlledTextField } from '@components/common';
import { MessageForm, MessageFormWrapper } from './AddNewMessageForm.styles.tsx';

export const AddNewMessageForm: FC<AddNewMessageFormProps> = ({
    sendMessage,
    blockSubmitButton = false
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
        <MessageFormWrapper>
            <MessageForm onSubmit={handleSubmit(handleSendMessage)}>
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
            </MessageForm>
        </MessageFormWrapper>
    );
};

type AddNewMessageFormProps = {
    sendMessage: (newMessage: string) => void;
    blockSubmitButton?: boolean;
} & TextFieldProps;

type FieldValues = {
    newMessage: string;
};
