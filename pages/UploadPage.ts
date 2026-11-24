import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavBar } from './components/NavBar';

export class UploadPage extends BasePage {
  readonly nav: NavBar;

  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.nav = new NavBar(page);

    this.fileInput = page.getByLabel('Choose file');
    this.uploadButton = page.getByRole('button', { name: 'Upload', exact: true });

    // Both messages are role="alert"; the success text tells them apart
    this.successMessage = page.getByRole('alert').filter({ hasText: 'uploaded successfully' });
    this.errorMessage = page.getByRole('alert').filter({ hasNotText: 'uploaded successfully' });
  }

  async open() {
    await this.goto('/upload');
  }

  async selectFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
  }

  async submit() {
    await this.uploadButton.click();
  }

  async uploadFile(filePath: string) {
    await this.selectFile(filePath);
    await this.submit();
  }

  async uploadBuffer(file:{name:string;mimeType:string;buffer:Buffer}):Promise<void>{

    await this.fileInput.setInputFiles(file)
    await this.submit()

  }

}