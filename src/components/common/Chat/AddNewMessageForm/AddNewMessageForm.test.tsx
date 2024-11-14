import { fireEvent, screen, waitFor } from '@testing-library/react';
import { AddNewMessageForm } from './AddNewMessageForm';
import { renderWithTranslation } from '@/test';

describe('AddNewMessageForm', () => {
    const sendMessageMock = jest.fn();

    test('renders the form correctly', async () => {
        renderWithTranslation(
            <AddNewMessageForm sendMessage={sendMessageMock} blockSubmitButton={false} />
        );
        expect(await screen.findByPlaceholderText('Message')).toBeInTheDocument();
        expect(await screen.findByTestId('SendIcon')).toBeInTheDocument();
    });

    test('submits a message when form is submitted', async () => {
        renderWithTranslation(
            <AddNewMessageForm sendMessage={sendMessageMock} blockSubmitButton={false} />
        );

        const input = await screen.findByPlaceholderText('Message');
        fireEvent.change(input, { target: { value: 'Hello' } });

        const btn = screen.getByRole('button', { name: 'Send message' });
        fireEvent.click(btn);

        await waitFor(() => {
            expect(sendMessageMock).toHaveBeenCalledWith('Hello');
        });
        expect(btn).toBeInTheDocument();
    });

    test('should call handleSendMessage when Enter key is pressed without Shift key', async () => {
        renderWithTranslation(
            <AddNewMessageForm sendMessage={sendMessageMock} blockSubmitButton={false} />
        );

        const textField = await screen.findByPlaceholderText('Message');
        expect(textField).toBeInTheDocument();

        fireEvent.change(textField, { target: { value: 'Test message' } });
        fireEvent.keyDown(textField, { key: 'Enter', code: 'Enter', shiftKey: false });

        await waitFor(() => {
            expect(sendMessageMock).toHaveBeenCalledWith('Test message');
        });
    });
});
