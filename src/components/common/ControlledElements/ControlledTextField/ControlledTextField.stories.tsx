import { Meta, StoryObj } from '@storybook/react';
import { ControlledTextField } from './ControlledTextField';
import { useForm, FormProvider } from 'react-hook-form';

const meta: Meta<typeof ControlledTextField> = {
    title: 'Components/ControlledTextField',
    component: ControlledTextField,
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        multiline: { control: 'boolean' },
        rules: { control: 'object' }
    }
};

export default meta;

type Story = StoryObj<typeof ControlledTextField>;

const Template = (args: any) => {
    const methods = useForm({
        defaultValues: {
            test: ''
        }
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => undefined)}>
                <ControlledTextField {...args} control={methods.control} />
            </form>
        </FormProvider>
    );
};

export const Default: Story = {
    render: Template,
    args: {
        name: 'textField',
        label: 'Controlled Text Field',
        placeholder: 'Enter text...',
        multiline: false,
        rules: { required: 'This field is required' }
    }
};

export const Multiline: Story = {
    render: Template,
    args: {
        name: 'multilineField',
        label: 'Multiline Field',
        placeholder: 'Enter multiline text...',
        multiline: true,
        rules: { required: 'Please enter some text' }
    }
};

export const WithValidation: Story = {
    render: Template,
    args: {
        name: 'validatedField',
        label: 'Validated Field',
        placeholder: 'Enter validated text...',
        rules: {
            required: 'This field is mandatory',
            minLength: { value: 5, message: 'Minimum 5 characters required' }
        }
    }
};
