import { FC, memo, useEffect } from 'react';
import { getUsersFilter, useAppSelector, UsersFilter } from '../../../../redux';
import { useForm, useFormState } from 'react-hook-form';
import { ControlledTextField } from '../../../common';
import { Button, MenuItem } from '@mui/material';
import { ControlledSelectField } from '../../../common/ControlledElements/ControlledSelectField';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

type Friend = 'true' | 'false' | 'null';
type FieldValues = {
    term: string;
    friend: Friend;
};

type UsersSearchFormProps = {
    handleFilterChanged: (filter: UsersFilter) => void;
};

export const UsersSearchForm: FC<UsersSearchFormProps> = memo(({ handleFilterChanged }) => {
    const filter = useAppSelector(getUsersFilter);
    const { t } = useTranslation('users');

    const { control, reset, handleSubmit } = useForm<FieldValues>({
        defaultValues: { term: '', friend: 'null' }
    });
    const { isSubmitting } = useFormState<FieldValues>({ control });

    // Resetting form values when changing filter
    useEffect(() => {
        reset({
            term: filter.term,
            friend: String(filter.friend) as Friend
        });
    }, [filter]);

    const handleFilterSubmit = (values: FieldValues) => {
        const filter: UsersFilter = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        };
        handleFilterChanged(filter);
    };

    return (
        <Form onSubmit={handleSubmit(handleFilterSubmit)}>
            <ControlledTextField
                control={control}
                label={t('search')}
                name="term"
                type="text"
                margin="none"
            />

            <ControlledSelectField control={control} name="friend" sx={{ width: '200px' }}>
                <MenuItem value="null">{t('all')}</MenuItem>
                <MenuItem value="true">{t('only followed')}</MenuItem>
                <MenuItem value="false">{t('only unfollowed')}</MenuItem>
            </ControlledSelectField>

            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {t('find')}
            </Button>
        </Form>
    );
});

export const Form = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '6px',
    width: '100%',
    height: 70,
    padding: '10px 0'
}));
