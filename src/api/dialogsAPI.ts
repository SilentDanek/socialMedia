import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Photos } from '../redux';

// Типи даних
export interface Dialog {
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

export type Message = {
    id: string;
    body: string;
    addedAt: string;
    recipientId: string;
    senderId: string;
    senderName: string;
    translatedBody: unknown;
    viewed: boolean;
}

export type Messages = {
    error: string | null | undefined;
    items:Message[];
    totalCount: number;
}


// Базовий URL для API
const BASE_URL = 'https://social-network.samuraijs.com/api/1.0/';

export const dialogsApi = createApi({
    reducerPath: 'dialogsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('API-KEY', '8535baf1-4bf0-4155-a641-cd65532bc347'); // Замінити на реальний API ключ
            return headers;
        },
        credentials: 'include', // Для роботи з cookies
    }),
    tagTypes: ['Dialogs', 'Messages'],  // Теги для кешування
    endpoints: (builder) => ({
        // Начать чат с пользователем
        startChat: builder.mutation<void, number>({
            query: (userId) => ({
                url: `dialogs/${userId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Dialogs'],
        }),

        // Получить все диалоги
        getDialogs: builder.query<Dialog[], void>({
            query: () => 'dialogs',
            providesTags: ['Dialogs'],
        }),

        // Получить сообщения с пользователем
        getMessages: builder.query<Messages, { userId: number; page?: number; count?: number }>({
            query: ({ userId, page = 1, count = 10 }) =>
                `dialogs/${userId}/messages?page=${page}&count=${count}`,
            providesTags: (_result, _error, { userId }) => [{ type: 'Messages', id: userId }],
        }),

        // Отправить сообщение пользователю
        sendMessage: builder.mutation<any, { userId: number; body: string }>({
            query: ({ userId, body }) => ({
                url: `dialogs/${userId}/messages`,
                method: 'POST',
                body: { body },
            }),
            invalidatesTags: (_result, _error, { userId }) => [{ type: 'Messages', id: userId }],
        }),

        // Проверить, прочитано ли сообщение
        isMessageViewed: builder.query<any, number>({
            query: (messageId) => `dialogs/messages/${messageId}/viewed`,
        }),

        // Пометить сообщение как спам
        markAsSpam: builder.mutation<any, number>({
            query: (messageId) => ({
                url: `dialogs/messages/${messageId}/spam`,
                method: 'POST',
            }),
        }),

        // Удалить сообщение только для себя
        deleteMessage: builder.mutation<any, number>({
            query: (messageId) => ({
                url: `dialogs/messages/${messageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, messageId) => [{ type: 'Messages', id: messageId }],
        }),

        // Восстановить сообщение из спама или удаленных
        restoreMessage: builder.mutation<any, number>({
            query: (messageId) => ({
                url: `dialogs/messages/${messageId}/restore`,
                method: 'PUT',
            }),
            invalidatesTags: (_result, _error, messageId) => [{ type: 'Messages', id: messageId }],
        }),

        // Получить сообщения, новее чем определенная дата
        getNewMessagesSince: builder.query<any, { userId: number; date: string }>({
            query: ({ userId, date }) =>
                `dialogs/${userId}/messages/new?newerThen=${date}`,
            providesTags: (_result, _error, { userId }) => [{ type: 'Messages', id: userId }],
        }),

        // Получить количество новых сообщений
        getNewMessagesCount: builder.query<any, void>({
            query: () => 'dialogs/messages/new/count',
        }),
    }),
});

export const {
    useStartChatMutation,
    useGetDialogsQuery,
    useGetMessagesQuery,
    useSendMessageMutation,
    useIsMessageViewedQuery,
    useMarkAsSpamMutation,
    useDeleteMessageMutation,
    useRestoreMessageMutation,
    useGetNewMessagesSinceQuery,
    useGetNewMessagesCountQuery,
} = dialogsApi;
