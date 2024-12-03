import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ProfileStatus } from './ProfileStatus';
import { configureMockStoreTyped } from '@/test';

// Mock функции
const mockUpdateStatus = jest.fn();

describe('ProfileStatus component', () => {
    const mockStore = configureMockStoreTyped();
    const store = mockStore({
        auth: {
            isAuth: true // Начальное состояние для auth
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderWithProvider = (ui: any) => render(<Provider store={store}>{ui}</Provider>);

    test('renders status from props', () => {
        renderWithProvider(<ProfileStatus status="Test status" updateStatus={mockUpdateStatus} />);
        const statusElement = screen.getByText('Test status');
        expect(statusElement).toBeInTheDocument();
    });

    test('renders "No status" when no status is provided', () => {
        renderWithProvider(<ProfileStatus status="" updateStatus={mockUpdateStatus} />);
        const statusElement = screen.getByText('No status');
        expect(statusElement).toBeInTheDocument();
    });

    test('enters edit mode on double click', () => {
        renderWithProvider(<ProfileStatus status="Test status" updateStatus={mockUpdateStatus} />);
        const statusElement = screen.getByText('Test status');
        fireEvent.doubleClick(statusElement);

        const inputElement = screen.getByDisplayValue('Test status');
        expect(inputElement).toBeInTheDocument();
    });

    test('updates status on input change', () => {
        renderWithProvider(<ProfileStatus status="Test status" updateStatus={mockUpdateStatus} />);
        fireEvent.doubleClick(screen.getByText('Test status'));

        const inputElement = screen.getByDisplayValue('Test status');
        fireEvent.change(inputElement, { target: { value: 'New status' } });

        expect(inputElement).toHaveDisplayValue('New status');
    });

    test('calls updateStatus with new value on blur', () => {
        renderWithProvider(<ProfileStatus status="Test status" updateStatus={mockUpdateStatus} />);
        fireEvent.doubleClick(screen.getByText('Test status'));

        const inputElement = screen.getByDisplayValue('Test status');
        fireEvent.change(inputElement, { target: { value: 'New status' } });
        fireEvent.blur(inputElement);

        expect(mockUpdateStatus).toHaveBeenCalledWith('New status');
    });

    test('does not call updateStatus if status is unchanged', () => {
        renderWithProvider(<ProfileStatus status="Test status" updateStatus={mockUpdateStatus} />);
        fireEvent.doubleClick(screen.getByText('Test status'));

        const inputElement = screen.getByDisplayValue('Test status');
        fireEvent.blur(inputElement);

        expect(mockUpdateStatus).not.toHaveBeenCalled();
    });
});
