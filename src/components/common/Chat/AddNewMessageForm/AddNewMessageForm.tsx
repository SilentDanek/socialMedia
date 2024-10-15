import { CircularProgress, IconButton, Paper, TextField, TextFieldProps } from '@mui/material';
import { EmojiEmotions, Send } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';

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

    return (
        <Paper elevation={3} sx={{ borderRadius: '25px' }}>
            <form
                onSubmit={handleSubmit(handleSendMessage)}
                style={{ width: '100%', display: 'flex' }}
            >
                <IconButton>
                    <EmojiEmotions />
                </IconButton>
                <Controller
                    name="newMessage"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            multiline
                            maxRows={6}
                            autoComplete="off"
                            placeholder={t('message')}
                            fullWidth
                            slotProps={{
                                input: {
                                    sx: {
                                        '& fieldset': { border: 'none' },
                                        minWidth: '150px'
                                    }
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(handleSendMessage)();
                                }
                            }}
                        />
                    )}
                />
                <IconButton type="submit" disabled={blockSubmitButton}>
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
