import { FC, memo, useMemo } from "react";
import { Box, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import { FirstPage, ChevronLeft, ChevronRight, LastPage } from "@mui/icons-material";
import { PaginatorButton } from "./Paginator.styles";


export const Paginator: FC<PaginatorProps> = memo(({
                                                       totalItemsCount,
                                                       itemsInPage,
                                                       currentPage,
                                                       handlePageChanged,
                                                       portionSize = 10,
                                                       responsive = false
                                                   }) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));
    const isLd = useMediaQuery(theme.breakpoints.down("lg"));

    if(responsive){
        console.log(isSm + " " + isMd + " " + isLd + " ");
        if(isSm){
            portionSize = 1;
        } else if(isMd){
            portionSize = Math.floor(portionSize/2);
            console.log(portionSize);
        } else if (isLd) {
            portionSize = Math.ceil(portionSize * (1 - 0.33));
            console.log(portionSize);
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
        let pagesArray = [];
        for (let i = leftPortionPageNumber; i <= rightPortionPageNumber; i++) {
            pagesArray.push(i);
        }
        return pagesArray;
    }, [leftPortionPageNumber, rightPortionPageNumber]);


    return (
        <Stack direction={"row"} alignItems={"center"}>
            <Button variant={"contained"} disabled={blockLeftButton} color={"secondary"}
                    onClick={() => handlePageChanged(1)}><FirstPage /></Button>
            <Button variant={"contained"} disabled={blockLeftButton} color={"secondary"}
                    onClick={() => handlePageChanged(currentPage - 1)}><ChevronLeft /></Button>

            <Box>
                {createPaginationItems(pages, currentPage, handlePageChanged)}
            </Box>

            <Button variant={"contained"} disabled={blockRightButton} color={"secondary"}
                    onClick={() => handlePageChanged(currentPage + 1)}><ChevronRight /></Button>
            <Button variant={"contained"} disabled={blockRightButton} color={"secondary"}
                    onClick={() => handlePageChanged(pagesCount)}><LastPage /></Button>
        </Stack>
    );
});

const createPaginationItems = (items: number[], currentItem: number, handlePageChanged: (page: number) => void) => {
    return items.map(item => (
        <PaginatorButton key={item} variant={'contained'} onClick={() => handlePageChanged(item)} active={item === currentItem}>
            {item}
        </PaginatorButton>
    ))
};


type PaginatorProps = {
    totalItemsCount: number;
    itemsInPage: number;
    currentPage: number;
    handlePageChanged: (page: number) => void;
    portionSize?: number;
    responsive?: boolean;
}
