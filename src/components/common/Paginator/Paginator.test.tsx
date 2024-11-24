import { fireEvent, render, screen } from '@testing-library/react';
import { Paginator, PaginatorProps } from './Paginator';
import { ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import { createTheme } from '@mui/material/styles';

jest.mock('@mui/material/styles', () => ({
    ...jest.requireActual('@mui/material/styles'),
    useTheme: jest.fn()
}));

jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: jest.fn()
}));
const mockOnPageChanged = jest.fn();

const defaultProps = {
    totalItemsCount: 1000,
    itemsInPage: 10,
    currentPage: 1,
    handlePageChanged: mockOnPageChanged,
    portionSize: 7
};

const setup = (paginatorProps: PaginatorProps, isSm = false, isMd = false, isLg = false) => {
    const mockTheme = {
        breakpoints: {
            down: jest.fn((type) => {
                if (type === 'sm' && isSm) {
                    return true;
                }
                if (type === 'md' && isMd) {
                    return true;
                }
                return type === 'lg' && isLg;
            })
        }
    };
    (useTheme as jest.Mock).mockReturnValue(mockTheme);

    // Мокаем useMediaQuery для 'sm' экрана
    (useMediaQuery as jest.Mock).mockImplementation((res) => res);

    const theme = createTheme();
    return render(
        <ThemeProvider theme={theme}>
            <Paginator responsive={true} {...paginatorProps} />
        </ThemeProvider>
    );
};

describe('Paginator', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render the paginator with correct initial buttons', () => {
        setup(defaultProps);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
        expect(screen.getByTestId('FirstPageButton')).toBeDisabled();
        expect(screen.getByTestId('PrevPageButton')).toBeDisabled();
        expect(screen.getByTestId('NextPageButton')).toBeEnabled();
        expect(screen.getByTestId('LastPageButton')).toBeEnabled();
    });
    test('should renders correct number of page buttons', () => {
        setup(defaultProps);
        const pageButtons = screen.getAllByText(/^\d+$/);
        expect(pageButtons.length).toBe(defaultProps.portionSize);
    });
    test('should calls onPageChanged with correct page number when a page button is clicked', () => {
        setup(defaultProps);
        fireEvent.click(screen.getByText('2'));
        expect(mockOnPageChanged).toHaveBeenCalledWith(2);
    });
    test('next page after current should be n+1', () => {
        setup({
            ...defaultProps,
            currentPage: 10
        });

        const button10 = screen.getByText('10');

        const parentLi = button10.closest('li');
        expect(parentLi).toBeInTheDocument();
        const nextLi = parentLi?.nextElementSibling;
        expect(nextLi).toBeInTheDocument();

        const button11 = nextLi?.querySelector('button');
        expect(button11).toHaveTextContent('11');
    });
    test("shouldn't contain more pages then totalItemsCount/itemsInPage", () => {
        setup({
            ...defaultProps,
            currentPage: 100
        });
        expect(screen.queryByText('101')).toBeNull();
    });
    test('should contain only 1 button with pages and 4 nav when screen is small (sm)', () => {
        setup(defaultProps, true);
        const paginationItems = screen.getAllByRole('button');
        expect(paginationItems.length).toBe(5);
    });
    test('should contain only 3 button with pages and 4 nav when screen is medium (md)', () => {
        setup(defaultProps, false, true);
        const paginationItems = screen.getAllByRole('button');
        expect(paginationItems.length).toBe(7);
    });
    test('should contain only 5 button with pages and 4 nav when screen is large (ld)', () => {
        setup(defaultProps, false, false, true);
        const paginationItems = screen.getAllByRole('button');
        expect(paginationItems.length).toBe(9);
    });
});
