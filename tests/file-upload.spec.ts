import { test, expect } from '@playwright/test';
import path from 'path';
import fs from "fs"

test.describe('File Upload', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaautomationlabs.com/testing/file-upload.php');
  });

  test('upload a file using the Browse File input', async ({ page }) => {
    const filePath = path.join(__dirname, 'fixtures', 'avatar.png');

    await page.getByTestId('upload-file-input').setInputFiles(filePath);

    await expect(page.getByTestId('upload-file-info')).toContainText('avatar.png');
  });

  test('upload a file using the Browse button (file chooser)', async ({ page }) => {
    const filePath = path.join(__dirname, 'fixtures', 'avatar.png');

    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.getByTestId('upload-browse-btn').click(),
    ]);
    await fileChooser.setFiles(filePath);

    await expect(page.getByTestId('upload-file-info')).toContainText('avatar.png');
  });
});