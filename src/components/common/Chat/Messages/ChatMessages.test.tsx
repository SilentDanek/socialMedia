import { render, screen } from '@testing-library/react';
import { ChatMessages } from './ChatMessages';
import { useAppSelector } from '@/redux';
import { Message } from '../Chat.tsx';

jest.mock('../../../../redux', () => ({
    useAppSelector: jest.fn()
}));

jest.mock('../../../../hooks', () => ({
    useAutoScroll: jest.fn(() => ({
        handleScroll: jest.fn(),
        autoScrollRef: { current: null }
    }))
}));

describe('ChatMessages component', () => {
    const messages: Message[] = [
        { id: '1', userId: 1, message: 'Hello', userName: 'User 1' },
        { id: '2', userId: 2, message: 'Hi', userName: 'User 2' }
    ];

    test('renders messages correctly', () => {
        (useAppSelector as jest.Mock).mockReturnValue(1);

        render(<ChatMessages messages={messages} />);

        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('Hi')).toBeInTheDocument();
    });
});
