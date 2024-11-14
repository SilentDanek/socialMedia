import { render, screen, fireEvent } from '@testing-library/react';
import { MessageButton } from './MessageButton';
import { useStartChatMutation } from '@api/dialogsAPI.ts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Мокаем хуки
jest.mock('../../../api/dialogsAPI.ts', () => ({
    useStartChatMutation: jest.fn()
}));
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}));
jest.mock('react-i18next', () => ({
    useTranslation: jest.fn()
}));

describe('MessageButton', () => {
    const mockStartChatMutation = jest.fn();
    const mockNavigate = jest.fn();
    const mockT = jest.fn((key) => key);

    beforeEach(() => {
        (useStartChatMutation as jest.Mock).mockReturnValue([mockStartChatMutation]);
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        (useTranslation as jest.Mock).mockReturnValue({ t: mockT });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the button with the correct text', () => {
        render(<MessageButton userId={1} />);

        // Проверяем, что кнопка рендерится с текстом
        const button = screen.getByRole('button', { name: 'message' });
        expect(button).toBeInTheDocument();
    });

    test('calls startNewDialog and navigates when button is clicked', () => {
        render(<MessageButton userId={1} />);

        const button = screen.getByRole('button', { name: 'message' });

        // Нажимаем на кнопку
        fireEvent.click(button);

        // Проверяем, что вызвалась мутация для создания диалога
        expect(mockStartChatMutation).toHaveBeenCalledWith(1);

        // Проверяем, что навигация вызвалась с корректным путём
        expect(mockNavigate).toHaveBeenCalledWith('/dialogs/1');
    });
});
