import s from "./../Paginator/Paginator.module.css";

export const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}: any) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={s.pageSeqContainer}>
            {pages.map((page: number) => (
                <a key={page}
                   className={((currentPage === page) ? s.selectedPage : "") + " " + s.pageButton}
                   onClick={() => onPageChanged(page)}
                >{page}</a>
            ))}
        </div>
    );
};