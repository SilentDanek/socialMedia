import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Paginator } from './Paginator';

describe('Paginator', () => {
    const mockOnPageChanged = jest.fn();

    const defaultProps = {
        totalItemsCount: 100,
        itemsInPage: 10,
        currentPage: 1,
        handlePageChanged: mockOnPageChanged,
        portionSize: 8,
    };

    test('renders correct number of page buttons', () => {
        render(<Paginator {...defaultProps} />);

        const pageButtons = screen.getAllByText(/^\d+$/); // Поиск элементов с текстом-числом
        expect(pageButtons.length).toBe(10); // 100/10 = 10 страниц
    });



    test('calls onPageChanged with correct page number when a page button is clicked', () => {
        render(<Paginator {...defaultProps} />);
        fireEvent.click(screen.getByText('2')); // Выбор страницы 2
        expect(mockOnPageChanged).toHaveBeenCalledWith(2);
    });
})