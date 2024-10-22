import { instance } from './index.ts';

type GetCaptchaResponse = {
    url: string;
};
export const securityAPI = {
    getCaptchaUrl() {
        return instance
            .get<GetCaptchaResponse>(`security/get-captcha-url`)
            .then((response) => response.data);
    }
};
