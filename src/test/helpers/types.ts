import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { State } from '../../redux';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type AppDispatch = ThunkDispatch<State, unknown, UnknownAction>;
export const configureMockStoreTyped = <T>() =>
    configureMockStore<DeepPartial<T>, AppDispatch>([thunk as any]);
