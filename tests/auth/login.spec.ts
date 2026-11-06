import { test, expect } from '@playwright/test';

import { env } from '../../config/env';
import { LoginPage } from '../../pages/LoginPage';

test.describe('login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('valid tester can log in', { tag: '@smoke' }, async ({ page }) => {
    await loginPage.login(env.testerEmail, env.testerPassword);

    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByRole('heading', { name: `Welcome, ${env.testerEmail}` })).toBeVisible();
  });

  test('invalid password shows an error and stays on login', async ({ page }) => {
    await loginPage.login(env.testerEmail, 'wrong-password-123');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });
});

test('unauthenticated user is redirected from /upload to /login', async ({ page }) => {
  await page.goto('/upload');

  await expect(page).toHaveURL(/\/login/);
});
