import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Photos } from '../redux';

const BASE_URL = 'https://social-network.samuraijs.com/api/1.0/';

export const dialogsApi = createApi({
    reducerPath: 'dialogsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('API-KEY', '8535baf1-4bf0-4155-a641-cd65532bc347');
            return headers;
        },
        credentials: 'include'
    }),
    tagTypes: ['Dialogs', 'Messages'],
    endpoints: (builder) => ({
        startChat: builder.mutation<void, number>({
            query: (userId) => ({
                url: `dialogs/${userId}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Dialogs']
        }),

        getDialogs: builder.query<DialogResponse[], void>({
            query: () => 'dialogs',
            providesTags: ['Dialogs']
        }),

        getMessages: builder.query<TransformedMessagesResponse, { userId: number; count?: number }>(
            {
                query: ({ userId, count = 20 }) =>
                    `dialogs/${userId}/messages?page=${1}&count=${count}`,
                transformResponse: (response: MessagesResponse) => ({
                    error: response.error,
                    items: convertToCommonMessage(response),
                    totalCount: response.totalCount
                }),
                providesTags: (_result, _error, { userId }) => [{ type: 'Messages', id: userId }]
            }
        ),
        getOlderMessages: builder.query<
            TransformedMessagesResponse,
            { userId: number; page: number; count?: number }
        >({
            query: ({ userId, page, count = 20 }) =>
                `dialogs/${userId}/messages?page=${page}&count=${count}`,
            transformResponse: (response: MessagesResponse) => ({
                error: response.error,
                items: convertToCommonMessage(response),
                totalCount: response.totalCount
            })
        }),

        sendMessage: builder.mutation<void, { userId: number; body: string }>({
            query: ({ userId, body }) => ({
                url: `dialogs/${userId}/messages`,
                method: 'POST',
                body: { body }
            }),
            invalidatesTags: (_result, _error, { userId }) => [
                { type: 'Messages', userId },
                { type: 'Dialogs' }
            ]
        }),

        // Получить количество новых сообщений
        getNewMessagesCount: builder.query<number, object>({
            query: () => 'dialogs/messages/new/count'
        })
    })
});

export const convertToCommonMessage = (messages: MessagesResponse): TransformedMessage[] => {
    return messages.items.map((message) => ({
        viewed: message.viewed,
        message: message.body,
        userId: +message.senderId,
        userName: message.senderName,
        id: message.id,
        addedAt: message.addedAt,
        recipientId: message.recipientId,
        translatedBody: message.translatedBody
    }));
};

export interface DialogResponse {
    id: number;
    photos: Photos;
    userName: string;
    lastMessage: string;
    lastMessageDate: string;
    lastDialogActivityDate: string;
    lastUserActivityDate: string;
    hasNewMessages: boolean;
    newMessagesCount: number;
}

export type MessageResponse = {
    id: string;
    body: string;
    addedAt: string;
    recipientId: string;
    senderId: string;
    senderName: string;
    translatedBody: unknown;
    viewed: boolean;
};

export type MessagesResponse = {
    error: string | null | undefined;
    items: MessageResponse[];
    totalCount: number;
};

export type TransformedMessage = {
    viewed: boolean;
    message: string;
    userId: number;
    userName: string;
    id: string;
    addedAt: string;
    recipientId: string;
    translatedBody: unknown;
};

export type TransformedMessagesResponse = {
    error: string | null | undefined;
    items: TransformedMessage[];
    totalCount: number;
};

export const {
    useStartChatMutation,
    useGetDialogsQuery,
    useGetMessagesQuery,
    useGetOlderMessagesQuery,
    useSendMessageMutation,
    useGetNewMessagesCountQuery
} = dialogsApi;
