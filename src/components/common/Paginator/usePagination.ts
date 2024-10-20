import { useMediaQuery, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { PaginatorProps } from './Paginator.tsx';

export const usePagination = ({
    totalItemsCount,
    itemsInPage,
    currentPage,
    portionSize,
    responsive
}: Required<PaginatorProps>) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const isLg = useMediaQuery(theme.breakpoints.down('lg'));

    if (responsive) {
        if (isSm) {
            portionSize = 1;
        } else if (isMd) {
            portionSize = Math.floor(portionSize / 2);
        } else if (isLg) {
            portionSize = Math.ceil(portionSize * (1 - 0.33));
        }
    }

    const pagesCount = Math.ceil(totalItemsCount / itemsInPage);

    const halfPortionSize = Math.floor(portionSize / 2);

    let leftPortionPageNumber = Math.max(1, currentPage - halfPortionSize);
    let rightPortionPageNumber = leftPortionPageNumber + portionSize - 1;

    if (rightPortionPageNumber > pagesCount) {
        rightPortionPageNumber = pagesCount;
        leftPortionPageNumber = Math.max(1, rightPortionPageNumber - portionSize + 1);
    }

    const blockLeftButton = currentPage <= 1;
    const blockRightButton = currentPage >= pagesCount;

    const pages = useMemo(() => {
        const pagesArray = [];
        for (let i = leftPortionPageNumber; i <= rightPortionPageNumber; i++) {
            pagesArray.push(i);
        }
        return pagesArray;
    }, [leftPortionPageNumber, rightPortionPageNumber]);

    return {
        blockLeftButton,
        blockRightButton,
        pages,
        pagesCount
    };
};
