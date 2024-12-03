import { Meta, StoryObj } from '@storybook/react';
import { ControlledCheckbox } from './ControlledCheckbox';
import { useForm, FormProvider } from 'react-hook-form';

const meta: Meta<typeof ControlledCheckbox> = {
    title: 'Components/ControlledCheckbox',
    component: ControlledCheckbox,
    argTypes: {
        label: { control: 'text' },
        name: { control: 'text' },
        disabled: { control: 'boolean' }
    }
};

export default meta;

type Story = StoryObj<typeof ControlledCheckbox>;

const Template = (args: any) => {
    const methods = useForm({
        defaultValues: {
            test: false
        }
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
                <ControlledCheckbox {...args} control={methods.control} />
            </form>
        </FormProvider>
    );
};

export const Default: Story = {
    render: Template,
    args: {
        name: 'checkboxField',
        label: 'Default Checkbox'
    }
};

export const Disabled: Story = {
    render: Template,
    args: {
        name: 'disabledCheckbox',
        label: 'Disabled Checkbox',
        disabled: true
    }
};
