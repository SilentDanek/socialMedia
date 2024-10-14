import { Sidebar, SidebarAction } from './types';

const initialState: Sidebar = {};

export function sidebarReducer(state = initialState, action: SidebarAction): Sidebar {
    switch (action.type) {
        default: {
            return state;
        }
    }
}
