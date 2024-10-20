import { render, screen } from '@testing-library/react';
import { ChatMessage } from './ChatMessage';
import { MemoryRouter } from 'react-router-dom';

const messageProps = {
    message: 'Hello, this is a test message',
    photo: '',
    userId: 1,
    userName: 'John Doe',
    isMessageOwner: true,
    addedAt: '2024-10-20T12:30:00',
    viewed: true
};

const renderChatMessage = (props = {}) =>
    render(
        <MemoryRouter>
            <ChatMessage id="123" {...messageProps} {...props} />
        </MemoryRouter>
    );

describe('ChatMessage component', () => {
    test('renders message content correctly', () => {
        renderChatMessage();
        expect(screen.getByText('Hello, this is a test message')).toBeInTheDocument();
    });
    test('displays correct user name when the message is not from the owner', () => {
        renderChatMessage({ isMessageOwner: false });
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    test('displays "You" when the message is from the owner', () => {
        renderChatMessage();
        expect(screen.getByText('You')).toBeInTheDocument();
    });
    test('renders message time correctly', () => {
        renderChatMessage();
        expect(screen.getByText('15:30')).toBeInTheDocument();
    });
    test('renders avatar if photo is provided', () => {
        renderChatMessage({ photo: 'some-photo-url.jpg' });
        expect(screen.getByAltText('John Doe')).toBeInTheDocument();
    });
    test('renders DoneAllIcon if message is viewed', () => {
        renderChatMessage({ viewed: true });
        expect(screen.getByTestId('DoneAllIcon')).toBeInTheDocument();
    });
    test('renders DoneIcon if message is not viewed and is from the owner', () => {
        renderChatMessage({ viewed: false, isMessageOwner: true });
        expect(screen.getByTestId('DoneIcon')).toBeInTheDocument();
    });
});
