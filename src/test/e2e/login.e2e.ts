import LoginPage from '../pageobjects/login.page';

describe('Login Form E2E Test', () => {
    it('should not submit the form with invalid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('wronguser@example.com', 'WrongPassword', false);

        const currentUrl = await browser.getUrl();

        expect(currentUrl).toContain('/login');
        expect(LoginPage.errorMessage).toBeDefined();
    });
    it('should allow the user to login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('free@samuraijs.com', 'free', true);

        const currentUrl = await browser.getUrl();

        expect(currentUrl).toContain('/profile/');
    });
});
