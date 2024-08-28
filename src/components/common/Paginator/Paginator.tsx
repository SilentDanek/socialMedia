import {FC, memo, useMemo, useState} from 'react';
import cn from "classnames";
import s from "./Paginator.module.css";

const createPaginationItems = (items: number[], currentItem: number, onPageChanged: (page: number) => void) => (
    items.map(item => (
        <span key={item}
              className={cn(s.pageButton, {[s.selectedPage]: currentItem === item})}
              onClick={() => onPageChanged(item)}>
                    {item}
        </span>
    ))
);

type PaginatorProps = {
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
export const Paginator: FC<PaginatorProps> = memo(({
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

            {createPaginationItems(pages, currentPage, onPageChanged)}

            {portionCount > portionNumber && (
                <>
                    <button onClick={() => setPortionNumber(portionNumber + 1)}>{nextLabel}&nbsp;</button>
                    <button onClick={() => setPortionNumber(portionCount)}>{lastLabel}</button>
                </>
            )}
        </div>
    );
});