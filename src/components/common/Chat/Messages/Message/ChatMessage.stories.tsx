import { Meta, StoryObj } from '@storybook/react';
import { ChatMessage } from './ChatMessage';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof ChatMessage> = {
    title: 'Components/Chat/ChatMessage',
    component: ChatMessage,
    argTypes: {
        viewed: { control: 'boolean' },
        isMessageOwner: { control: 'boolean' },
        addedAt: { control: 'date' },
        photo: {
            control: 'boolean',
            description: 'Toggle photo on/off',
            mapping: {
                true: 'https://hromadske.ua/static/content/thumbs/889x/d/be/qjv6yv-3d67daa00e9ad6da584bfa5546dadbed.jpg',
                false: ''
            }
        }
    },
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof ChatMessage>;

export const Default: Story = {
    args: {
        message: 'Hello! How are you?',
        photo: '',
        userId: 1,
        userName: 'John Doe',
        isMessageOwner: false,
        addedAt: new Date().toISOString(),
        viewed: true
    }
};

export const OwnerMessage: Story = {
    args: {
        message: 'I am doing great, thanks!',
        photo: '',
        userId: 1,
        userName: 'You',
        isMessageOwner: true,
        addedAt: new Date().toISOString(),
        viewed: true
    }
};

export const NotViewedMessage: Story = {
    args: {
        message: 'Have you seen this?',
        photo: 'https://hromadske.ua/static/content/thumbs/889x/d/be/qjv6yv-3d67daa00e9ad6da584bfa5546dadbed.jpg',
        userId: 1,
        userName: 'Alice',
        isMessageOwner: true,
        addedAt: new Date().toISOString(),
        viewed: false
    }
};
