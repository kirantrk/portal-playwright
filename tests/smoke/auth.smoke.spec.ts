import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { env } from '../../config/env';


const WRONG_PASSWORD = 'definitely-not-the-password';

test.describe('Auth smoke', () => {
  test(
    'valid login lands on dashboard and shows user email',
    { tag: '@smoke' },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboard = new DashboardPage(page);
      await loginPage.open();
      await loginPage.login(env.testerEmail, env.testerPassword);
      await expect(page).toHaveURL(/\/dashboard/);
      await expect(dashboard.welcomeHeading).toBeVisible();
      await expect(dashboard.nav.userEmail).toHaveText(env.testerEmail);
    },
  );

  test('invalid login shows error and stays on login page', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);
   

    await loginPage.open();
    await loginPage.login(env.testerEmail, WRONG_PASSWORD);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
    await expect(dashboard.welcomeHeading).toHaveCount(0);
  });


test('logout returns to login page', { tag: '@smoke' }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboard = new DashboardPage(page);

  await loginPage.open();
  await loginPage.login(env.testerEmail, env.testerPassword);
  await expect(dashboard.welcomeHeading).toBeVisible();

  await dashboard.nav.logout();

  await expect(page).toHaveURL(/\/login/);
  await expect(loginPage.emailInput).toBeVisible();
});
});
