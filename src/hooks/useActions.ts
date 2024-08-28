import {useMemo} from 'react';
import {useAppDispatch} from "../redux/store";

export function useActions(actions: any[]) {
    const dispatch = useAppDispatch();
    return useMemo(() => actions.map((a) => (...args: any) => dispatch(a(...args))), [dispatch]);
}