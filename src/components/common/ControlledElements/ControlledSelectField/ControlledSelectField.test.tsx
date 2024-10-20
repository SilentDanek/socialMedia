import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { ControlledSelectField } from './ControlledSelectField';
import { MenuItem } from '@mui/material';

describe('ControlledSelectField', () => {
    const onSubmitMock = jest.fn();

    const TestComponent = () => {
        const { control, handleSubmit } = useForm({
            defaultValues: {
                testSelect: 'Option 1'
            }
        });
        return (
            <form onSubmit={handleSubmit(onSubmitMock)}>
                <ControlledSelectField name="testSelect" control={control} label="Test Select">
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                </ControlledSelectField>
                <button type="submit">Submit</button>
            </form>
        );
    };

    test('renders correctly with provided control', () => {
        render(<TestComponent />);
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    test('submits correct value when option changed and form is submitted', async () => {
        render(<TestComponent />);

        const select = screen.getByRole('combobox');
        fireEvent.mouseDown(select);

        const option = screen.getByText('Option 2');
        fireEvent.click(option);

        const btn = screen.getByText('Submit');
        fireEvent.click(btn);

        await waitFor(() =>
            expect(onSubmitMock).toHaveBeenCalledWith({ testSelect: 'Option 2' }, expect.anything())
        );
    });
});
