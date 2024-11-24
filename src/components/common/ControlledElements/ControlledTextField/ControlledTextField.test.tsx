import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import { ControlledTextField } from '@components/common';

describe('ControlledTextField', () => {
    const onSubmitMock = jest.fn();

    const TestComponent = () => {
        const { control, handleSubmit } = useForm();
        return (
            <form onSubmit={handleSubmit(onSubmitMock)}>
                <ControlledTextField
                    name="test"
                    control={control}
                    label="Test Label"
                    rules={{ required: 'This field is required' }}
                />
                <button type="submit">Submit</button>
            </form>
        );
    };

    test('renders correctly with provided control', () => {
        render(<TestComponent />);

        expect(screen.getAllByText('Test Label')).toHaveLength(2);
    });

    test('displays error message when fieldState contains an error', async () => {
        render(<TestComponent />);

        const btn = screen.getByText('Submit');
        fireEvent.click(btn);

        await waitFor(() => expect(screen.getByText('This field is required')).toBeInTheDocument());
    });

    test('submits correct value when form is filled and submitted', async () => {
        render(<TestComponent />);

        const input = screen.getByLabelText('Test Label', { selector: 'input' });
        const btn = screen.getByText('Submit');

        await userEvent.type(input, 'Test Value');
        fireEvent.click(btn);

        await waitFor(() =>
            expect(onSubmitMock).toHaveBeenCalledWith({ test: 'Test Value' }, expect.anything())
        );
    });
});
