import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { NavBar } from '../pages/components/NavBar';

export class FilePage extends BasePage {
  readonly nav: NavBar;
  readonly heading: Locator;
  readonly uploadFileButton: Locator;
  readonly table: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    super(page);

    this.nav = new NavBar(page);
    this.heading = page.getByRole('heading', { name: 'Uploaded documents' });
    this.uploadFileButton = page
      .getByRole('main')
      .getByRole('link', { name: 'Upload file', exact: true });
    this.table = page.getByRole('table');
    this.rows = this.table.locator('tbody tr');
  }

  async open() {
    await this.goto('/files');
  }

  getFileRow(name: string): Locator {
    return this.rows.filter({ hasText: name });
  }

  async getFileNames(): Promise<string[]> {
    return this.rows.locator('td:first-child').allTextContents();
  }

  async fileCount(): Promise<number> {
    return this.rows.count();
  }

  async downloadFile(name: string) {
    await this.getFileRow(name).first().getByRole('link', { name: 'Download' }).click();
  }
}
