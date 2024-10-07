import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { UsersFilter } from "../redux";

type Friend = "true" | "false" | "null";

type Params = {
    term: string | null;
    friend: Friend;
    page: string | null;
};

export const useUsersQueryParams = (
    currentPage: number,
    filter: UsersFilter,
    requestUsers: (page: number, pageSize: number, filter: UsersFilter) => void,
    pageSize: number
) => {
    const [searchParams, setSearchParams] = useSearchParams();

    //Preload users when the users page opens
    useEffect(() => {
        const parsed: Params = {
            term: searchParams.get("term"),
            friend: String(searchParams.get("friend")) as Friend,
            page: searchParams.get("page")
        };

        const actualPage = parsed.page ? Number(parsed.page) : currentPage;

        let actualFilter = filter;
        if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term };

        switch (parsed.friend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null };
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true };
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false };
                break;
        }
        requestUsers(actualPage, pageSize, actualFilter);
    }, []);

    // Set query params from filters
    useEffect(() => {
        const query = {
            ...(filter.term && { term: filter.term }),
            ...(filter.friend !== null && { friend: String(filter.friend) }),
            ...(currentPage !== 1 && { page: String(currentPage) })
        };

        setSearchParams(query);
    }, [filter, currentPage, setSearchParams]);
};