import { fireEvent, render, screen } from '@testing-library/react';
import { ChatMessage } from './ChatMessage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const messageProps = {
    message: 'Hello, this is a test message',
    photo: '',
    userId: 1,
    id: '123',
    userName: 'John Doe',
    isMessageOwner: true,
    addedAt: '2024-10-20T12:30:00',
    viewed: true
};

const renderChatMessage = (props = {}) =>
    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={<ChatMessage {...messageProps} {...props} />} />
                <Route path="/profile/:userId" element={<div>Profile Page</div>} />
            </Routes>
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
    test('navigates to the correct profile page when clicking on the avatar', async () => {
        renderChatMessage({ photo: 'some-photo-url.jpg' });

        const avatarLink = screen.getByRole('link', { name: /John Doe/i });
        expect(avatarLink).toBeInTheDocument();

        fireEvent.click(avatarLink);

        expect(screen.getByText('Profile Page')).toBeInTheDocument();
    });
});
