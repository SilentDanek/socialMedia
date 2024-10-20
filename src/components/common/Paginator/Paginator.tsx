import { FC, memo } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { ChevronLeft, ChevronRight, FirstPage, LastPage } from '@mui/icons-material';
import { PaginatorButton } from './Paginator.styles';
import { usePagination } from './usePagination.ts';

export const Paginator: FC<PaginatorProps> = memo(
    ({
        totalItemsCount,
        itemsInPage,
        currentPage,
        handlePageChanged,
        portionSize = 10,
        responsive = false
    }) => {
        const { pages, pagesCount, blockRightButton, blockLeftButton } = usePagination({
            totalItemsCount,
            itemsInPage,
            currentPage,
            handlePageChanged,
            portionSize,
            responsive
        });

        return (
            <Stack direction="row" alignItems="center">
                <Button
                    variant="contained"
                    disabled={blockLeftButton}
                    color="secondary"
                    data-testid="FirstPageButton"
                    onClick={() => handlePageChanged(1)}
                >
                    <FirstPage />
                </Button>
                <Button
                    variant="contained"
                    disabled={blockLeftButton}
                    color="secondary"
                    data-testid="PrevPageButton"
                    onClick={() => handlePageChanged(currentPage - 1)}
                >
                    <ChevronLeft />
                </Button>

                <Box>{createPaginationItems(pages, currentPage, handlePageChanged)}</Box>

                <Button
                    variant="contained"
                    disabled={blockRightButton}
                    color="secondary"
                    data-testid="NextPageButton"
                    onClick={() => handlePageChanged(currentPage + 1)}
                >
                    <ChevronRight />
                </Button>
                <Button
                    variant="contained"
                    disabled={blockRightButton}
                    color="secondary"
                    data-testid="LastPageButton"
                    onClick={() => handlePageChanged(pagesCount)}
                >
                    <LastPage />
                </Button>
            </Stack>
        );
    }
);

const createPaginationItems = (
    items: number[],
    currentItem: number,
    handlePageChanged: (page: number) => void
) => {
    return items.map((item) => (
        <PaginatorButton
            key={item}
            variant="contained"
            onClick={() => handlePageChanged(item)}
            active={item === currentItem ? 'true' : 'false'}
        >
            {item}
        </PaginatorButton>
    ));
};

export type PaginatorProps = {
    totalItemsCount: number;
    itemsInPage: number;
    currentPage: number;
    handlePageChanged: (page: number) => void;
    portionSize?: number;
    responsive?: boolean;
};
