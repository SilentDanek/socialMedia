import {DefaultResponse, instance, ResultCodeForCaptcha, ResultCodes} from "./api";

type MeResponse = DefaultResponse & {
    data: {
        id: number;
        email: string;
        login: string;
    };
};
type LoginResponse = {
    data: {
        userId: number;
    };
    resultCode: ResultCodes | ResultCodeForCaptcha;
    messages: string[];
};
type LogoutResponse = DefaultResponse & {
    data: {};
};
export const authAPI = {
    getAuthUserData() {
        return instance.get<MeResponse>("auth/me").then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha = "") {
        return instance.post<LoginResponse>("auth/login", {email, password, rememberMe, captcha}).then(response => response.data);
    },
    logout() {
        return instance.delete<LogoutResponse>("auth/login").then(response => response.data);
    },
}