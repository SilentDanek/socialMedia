import { renderHook } from '@testing-library/react';
import { useCustomTheme } from './useCustomTheme';
import React from 'react';
import { ThemeContext } from '../../theme';

describe('useCustomTheme', () => {
    test('should return context value when used within ThemeContext provider', () => {
        const mockTheme = { toggleTheme: () => undefined, themeMode: 'test' };

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <ThemeContext.Provider value={mockTheme}>{children}</ThemeContext.Provider>
        );

        const { result } = renderHook(() => useCustomTheme(), { wrapper });

        expect(result.current).toEqual(mockTheme);
    });

    test('should throw error when used outside of ThemeContext provider', () => {
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => renderHook(() => useCustomTheme())).toThrow(
            'useCustomTheme must be used within a CustomThemeProvider'
        );
        consoleErrorMock.mockRestore();
    });
});
