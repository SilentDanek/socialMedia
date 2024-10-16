import { InferActionsTypes } from '../../types';
import { navbarActions } from './actions';

export type NavbarItem = {
    text: string;
    route: string;
    icon?: null | string;
    badge?: number;
};

export type NavbarState = {
    selectedButtonIndex: number;
    navbarItems: NavbarItem[];
};

export type NavbarActions = InferActionsTypes<typeof navbarActions>;
