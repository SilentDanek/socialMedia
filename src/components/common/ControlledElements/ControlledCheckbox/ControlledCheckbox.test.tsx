import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { ControlledCheckbox } from '@components/common';

describe('ControlledTextField', () => {
    const onSubmitMock = jest.fn();

    const TestComponent = () => {
        const { control, handleSubmit } = useForm();
        return (
            <form onSubmit={handleSubmit(onSubmitMock)}>
                <ControlledCheckbox name="test" control={control} label="test Label" />
                <button type="submit">Submit</button>
            </form>
        );
    };

    test('renders correctly with provided control', () => {
        render(<TestComponent />);
        expect(screen.getByLabelText('test Label')).toBeInTheDocument();
    });

    test('submits correct value when form is filled and submitted', async () => {
        render(<TestComponent />);

        const input = screen.getByLabelText('test Label');
        const btn = screen.getByText('Submit');

        fireEvent.click(input);
        fireEvent.click(btn);

        await waitFor(() =>
            expect(onSubmitMock).toHaveBeenCalledWith({ test: true }, expect.anything())
        );

        fireEvent.click(input);
        fireEvent.click(btn);

        await waitFor(() =>
            expect(onSubmitMock).toHaveBeenCalledWith({ test: false }, expect.anything())
        );
    });
});
