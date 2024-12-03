import { Meta, StoryObj } from '@storybook/react';
import { ControlledSelectField } from './ControlledSelectField';
import { useForm, FormProvider } from 'react-hook-form';
import { MenuItem } from '@mui/material';

const meta: Meta<typeof ControlledSelectField> = {
    title: 'Components/ControlledSelectField',
    component: ControlledSelectField,
    argTypes: {
        name: { control: 'text' },
        rules: { control: 'object' },
        label: { control: 'text' },
        children: { control: false }
    }
};

export default meta;

type Story = StoryObj<typeof ControlledSelectField>;

const Template = (args: any) => {
    const methods = useForm({
        defaultValues: {
            [args.name]: ''
        }
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
                <ControlledSelectField {...args} control={methods.control}>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                </ControlledSelectField>
            </form>
        </FormProvider>
    );
};

export const Default: Story = {
    render: Template,
    args: {
        name: 'selectField',
        label: 'Select an Option',
        rules: { required: 'This field is required' }
    }
};

export const WithValidation: Story = {
    render: Template,
    args: {
        name: 'validatedSelectField',
        label: 'Select with Validation',
        rules: {
            required: 'Please select an option'
        }
    }
};
