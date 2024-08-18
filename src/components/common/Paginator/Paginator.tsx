import React, {useState, useMemo, memo} from 'react';
import s from "./Paginator.module.css";

interface PaginatorProps {
    totalItemsCount: number;
    pageSize: number;
    currentPage: number;
    onPageChanged: (page: number) => void;
    portionSize?: number;
    firstLabel?: string;
    prevLabel?: string;
    nextLabel?: string;
    lastLabel?: string;
}

const createPaginationItems = (items:any[], currentItem:number,onPageChanged: (page: number) => void) => (
    items.map(item => (
        <span key={item}
              className={`${currentItem === item ? s.selectedPage : ''} ${s.pageButton}`}
              onClick={() => onPageChanged(item)}>
                    {item}
        </span>
    ))
);

export const Paginator: React.FC<PaginatorProps> = memo(({
                                                        totalItemsCount,
                                                        pageSize,
                                                        currentPage,
                                                        onPageChanged,
                                                        portionSize = 10,
                                                        firstLabel = '«First',
                                                        prevLabel = '‹Prev',
                                                        nextLabel = 'Next›',
                                                        lastLabel = 'Last»',
                                                    }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const portionCount = Math.ceil(pagesCount / portionSize);

    const [portionNumber, setPortionNumber] = useState(1);

    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    const pages = useMemo(() => {
        let pagesArray = [];
        for (let i = leftPortionPageNumber; i <= Math.min(rightPortionPageNumber, pagesCount); i++) {
            pagesArray.push(i);
        }
        return pagesArray;
    }, [leftPortionPageNumber, rightPortionPageNumber, pagesCount]);

    return (
        <div className={s.itemsSeqContainer}>
            {portionNumber > 1 && (
                <>
                    <button onClick={() => setPortionNumber(1)}>{firstLabel}&nbsp;</button>
                    <button onClick={() => setPortionNumber(portionNumber - 1)}>{prevLabel}</button>
                </>
            )}

            { createPaginationItems(pages, currentPage, onPageChanged) }

            {portionCount > portionNumber && (
                <>
                    <button onClick={() => setPortionNumber(portionNumber + 1)}>{nextLabel}&nbsp;</button>
                    <button onClick={() => setPortionNumber(portionCount)}>{lastLabel}</button>
                </>
            )}
        </div>
    );
});