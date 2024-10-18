import { render, screen, fireEvent } from '@testing-library/react';
import { Paginator } from './Paginator';

describe('Paginator', () => {
    const mockOnPageChanged = jest.fn();

    const defaultProps = {
        totalItemsCount: 100,
        itemsInPage: 10,
        currentPage: 1,
        handlePageChanged: mockOnPageChanged,
        portionSize: 8
    };

    test('renders correct number of page buttons', () => {
        render(<Paginator {...defaultProps} />);

        const pageButtons = screen.getAllByText(/^\d+$/);
        expect(pageButtons.length).toBe(defaultProps.portionSize);
    });

    test('calls onPageChanged with correct page number when a page button is clicked', () => {
        render(<Paginator {...defaultProps} />);
        fireEvent.click(screen.getByText('2'));
        expect(mockOnPageChanged).toHaveBeenCalledWith(2);
    });
});
