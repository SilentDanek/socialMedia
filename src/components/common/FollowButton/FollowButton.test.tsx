import { render, screen, fireEvent } from '@testing-library/react';
import { FollowButton } from './Followbutton.tsx';
import { useAppSelector, boundThunks } from '@/redux';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { ReactJSX } from '@emotion/react/types/jsx-namespace';

// Мокаем необходимые хуки и функции
jest.mock('../../../redux', () => ({
    useAppSelector: jest.fn(),
    boundThunks: {
        usersThunks: {
            follow: jest.fn(),
            unfollow: jest.fn()
        }
    }
}));
jest.mock('react-i18next', () => ({
    useTranslation: jest.fn()
}));

describe('FollowButton component', () => {
    const mockFollow = jest.fn();
    const mockUnfollow = jest.fn();
    const mockT = jest.fn((key) => key);

    const mockOnClick = jest.fn();

    beforeEach(() => {
        (useAppSelector as jest.Mock).mockReturnValue([]);
        boundThunks.usersThunks.follow = mockFollow;
        boundThunks.usersThunks.unfollow = mockUnfollow;
        (useTranslation as jest.Mock).mockReturnValue({ t: mockT });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderWithBrowserRouter = (ui: ReactJSX) => render(<BrowserRouter>{ui}</BrowserRouter>);

    test('renders follow button correctly when user is not followed', () => {
        renderWithBrowserRouter(<FollowButton isFollow={false} userId={1} />);

        const button = screen.getByRole('button', { name: 'follow' });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('follow');
        expect(button).toHaveStyle({ width: '130px' });
    });

    test('renders unfollow button correctly when user is followed', () => {
        renderWithBrowserRouter(<FollowButton isFollow={true} userId={1} />);

        const button = screen.getByRole('button', { name: 'unfollow' });
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('unfollow');
        expect(button).toHaveStyle({ width: '130px' });
    });

    test('calls follow thunk when user is not followed', () => {
        renderWithBrowserRouter(<FollowButton isFollow={false} userId={1} />);

        const button = screen.getByRole('button', { name: 'follow' });

        fireEvent.click(button);
        expect(mockFollow).toHaveBeenCalledWith(1);
    });

    test('calls unfollow thunk when user is followed', () => {
        renderWithBrowserRouter(<FollowButton isFollow={true} userId={1} />);

        const button = screen.getByRole('button', { name: 'unfollow' });

        fireEvent.click(button);
        expect(mockUnfollow).toHaveBeenCalledWith(1);
    });

    test('disables button when following is in progress', () => {
        (useAppSelector as jest.Mock).mockReturnValue([1]);

        renderWithBrowserRouter(<FollowButton isFollow={false} userId={1} />);

        const button = screen.getByRole('button', { name: 'follow' });
        expect(button).toBeDisabled();
    });

    test('calls onClick callback when provided', () => {
        renderWithBrowserRouter(<FollowButton isFollow={false} userId={1} onClick={mockOnClick} />);

        const button = screen.getByRole('button', { name: 'follow' });

        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalled();
    });
});
