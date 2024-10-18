import { render } from '@testing-library/react';
import { App } from './App.tsx';

test('renders without crashing', () => {
    render(<App />);
});
