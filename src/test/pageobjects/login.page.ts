// login.page.ts (Page Object)
class LoginPage {
    // Селекторы элементов
    get emailField() {
        return $('input[name="email"]');
    }
    get passwordField() {
        return $('input[name="password"]');
    }
    get rememberMeCheckBox() {
        return $('input[name="rememberMe"]');
    }
    get captchaField() {
        return $('input[name="captcha"]');
    }
    get submitButton() {
        return $('button[type="submit"]');
    }
    get resetButton() {
        return $('button[type="button"]');
    }
    get errorMessage() {
        return $('.Mui-error') || $('[data-testId="form-error-text"]');
    }

    async open() {
        await browser.url('/');
    }

    async login(email: string, password: string, rememberMe: boolean, captcha?: string) {
        await this.emailField.setValue(email);
        await this.passwordField.setValue(password);
        if (rememberMe) {
            await this.rememberMeCheckBox.click();
        }
        if (captcha) {
            await this.captchaField.setValue(captcha);
        }
        await this.submitButton.click();
        await new Promise((resolve) => setTimeout(() => resolve(232), 500));
    }

    async resetForm() {
        await this.resetButton.click();
    }
}

export default new LoginPage();
