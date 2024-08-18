import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { ProfileStatus } from './ProfileStatus';

// Mock функции
const mockUpdateStatus = jest.fn();

describe('ProfileStatus component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders status from props', () => {
        render(<ProfileStatus status="Test status" updateStatus={mockUpdateStatus} />);
        const statusElement = screen.getByText("Test status");
        expect(statusElement).toBeInTheDocument();
    });

    test('renders "No status" when no status is provided', () => {
        render(<ProfileStatus status="" updateStatus={mockUpdateStatus} />);
        const statusElement = screen.getByText("No status");
        expect(statusElement).toBeInTheDocument();
    });

    test('enters edit mode on double click', () => {
        render(<ProfileStatus status="Test status" updateStatus={mockUpdateStatus} />);
        const statusElement = screen.getByText("Test status");
        fireEvent.doubleClick(statusElement);

        const inputElement = screen.getByDisplayValue("Test status");
        expect(inputElement).toBeInTheDocument();
    });

    test('updates status on input change', () => {
        render(<ProfileStatus status="Test status" updateStatus={mockUpdateStatus} />);
        fireEvent.doubleClick(screen.getByText("Test status"));

        const inputElement = screen.getByDisplayValue("Test status");
        fireEvent.change(inputElement, { target: { value: 'New status' } });

        expect(inputElement).toHaveValue('New status');
    });

    test('calls updateStatus with new value on blur', () => {
        render(<ProfileStatus status="Test status" updateStatus={mockUpdateStatus} />);
        fireEvent.doubleClick(screen.getByText("Test status"));

        const inputElement = screen.getByDisplayValue("Test status");
        fireEvent.change(inputElement, { target: { value: 'New status' } });
        fireEvent.blur(inputElement);

        expect(mockUpdateStatus).toHaveBeenCalledWith('New status');
    });

    test('does not call updateStatus if status is unchanged', () => {
        render(<ProfileStatus status="Test status" updateStatus={mockUpdateStatus} />);
        fireEvent.doubleClick(screen.getByText("Test status"));

        const inputElement = screen.getByDisplayValue("Test status");
        fireEvent.blur(inputElement);

        expect(mockUpdateStatus).not.toHaveBeenCalled();
    });

    test('matches the snapshot', () => {
        const { container } = render(<ProfileStatus status="Test status" updateStatus={() => {}} />);
        expect(container).toMatchSnapshot();
    });
});
