import axios from 'axios';

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type DefaultResponse = {
    resultCode: ResultCodes;
    messages: string[];
};

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: { 'API-KEY': '8535baf1-4bf0-4155-a641-cd65532bc347' },
    withCredentials: true
});
