import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Paginator } from './Paginator';

describe('Paginator', () => {
    const mockOnPageChanged = jest.fn();

    const defaultProps = {
        totalItemsCount: 100,
        pageSize: 10,
        currentPage: 1,
        onPageChanged: mockOnPageChanged,
        portionSize: 10,
        firstLabel: '«First',
        prevLabel: '‹Prev',
        nextLabel: 'Next›',
        lastLabel: 'Last»',
    };

    test('renders correct number of page buttons', () => {
        render(<Paginator {...defaultProps} />);

        const pageButtons = screen.getAllByText(/^\d+$/); // Поиск элементов с текстом-числом
        expect(pageButtons.length).toBe(10); // 100/10 = 10 страниц
    });



    test('calls onPageChanged with correct page number when a page button is clicked', () => {
        render(<Paginator {...defaultProps} />);
        console.log(screen.getByText('2'))
        fireEvent.click(screen.getByText('2')); // Выбор страницы 2
        expect(mockOnPageChanged).toHaveBeenCalledWith(2);
    });
})