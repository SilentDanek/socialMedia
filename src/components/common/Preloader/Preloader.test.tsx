import { render, screen } from '@testing-library/react';
import { Preloader } from './Preloader';
import svgPreloader from '../../../assets/images/bouncing-circles.svg';

describe('Preloader component', () => {
    test('renders the preloader image', () => {
        render(<Preloader />);

        const img = screen.getByAltText('preloader');
        expect(img).toBeInTheDocument();

        expect(img).toHaveAttribute('src', svgPreloader);

        expect(img).toHaveStyle({ height: '50%' });
    });
});
