import { Meta, StoryObj } from '@storybook/react';
import { AddNewMessageForm } from './AddNewMessageForm';
import i18n from '@/locales/i18n';
import { I18nextProvider } from 'react-i18next';

const meta: Meta<typeof AddNewMessageForm> = {
    title: 'Components/Chat/AddNewMessageForm',
    component: AddNewMessageForm,

    argTypes: {
        sendMessage: {
            description: 'Enables sending messages from the form',
            action: 'sendMessage action' // Автоматически генерирует экшен
        },
        blockSubmitButton: {
            description: 'Blocks the submit button by displaying the loader',
            control: { type: 'boolean' }
        }
    },
    parameters: {
        docs: {
            description: {
                component: 'A form for sending new messages with a submit button.'
            }
        },
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#000000' }
            ]
        }
    },
    decorators: [
        (Story) => (
            <I18nextProvider i18n={i18n}>
                <Story />
            </I18nextProvider>
        )
    ],

    tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof AddNewMessageForm>;

export const Default: Story = {
    args: {
        blockSubmitButton: false // По умолчанию кнопка не заблокирована
    },
    render: (args) => {
        function sendMessage(message: string) {
            args.sendMessage(message);
        }

        return (
            <AddNewMessageForm
                sendMessage={sendMessage} // Передаём экшен для отслеживания
                blockSubmitButton={args.blockSubmitButton} // Учитываем блокировку кнопки
            />
        );
    }
};
