import { useAutoScroll } from '@/hooks';
import { renderHook } from '@testing-library/react';
import React from 'react';

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('useAutoScroll', () => {
    let observedObject: object;
    const mockRef = { current: document.createElement('div') };
    const setStateMock = jest.fn();

    jest.spyOn(React, 'useRef').mockReturnValue(mockRef);
    jest.spyOn(React, 'useState').mockImplementation(() => [true, setStateMock]);

    beforeEach(() => {
        observedObject = { key: 'value' };

        jest.clearAllMocks();
    });

    test('should scroll into view when observedObject changes and auto scroll is enabled', () => {
        const { rerender } = renderHook(() => useAutoScroll(observedObject));

        observedObject = { key: 'new value' };
        rerender();

        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(2);
    });

    test('should handle scroll up (disable auto scroll) when user scrolls up', () => {
        const { result } = renderHook(() => useAutoScroll(observedObject));

        result.current.handleScroll({
            currentTarget: {
                scrollHeight: 2000,
                scrollTop: 100,
                clientHeight: 300
            }
        } as React.UIEvent<HTMLElement>);

        expect(setStateMock).toHaveBeenCalledWith(false);
    });

    test('should enable auto scroll when user scrolls to the bottom', () => {
        const { result } = renderHook(() => useAutoScroll(observedObject));

        result.current.handleScroll({
            currentTarget: {
                scrollHeight: 2000,
                scrollTop: 100,
                clientHeight: 300
            }
        } as React.UIEvent<HTMLElement>);

        expect(setStateMock).toHaveBeenCalledWith(false);

        result.current.handleScroll({
            currentTarget: {
                scrollHeight: 1000,
                scrollTop: 700,
                clientHeight: 300
            }
        } as React.UIEvent<HTMLElement>);

        expect(setStateMock).toHaveBeenCalledWith(true);
    });
});
