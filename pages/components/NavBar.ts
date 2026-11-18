import { Page, Locator } from '@playwright/test';

export class NavBar {
  private readonly nav: Locator;

  readonly dashboardLink: Locator;
  readonly uploadFileLink: Locator;
  readonly myFilesLink: Locator;
  readonly requirementsLink: Locator;
  readonly architectureLink: Locator;
  readonly testingLink: Locator;
  readonly userEmail: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.nav = page.getByRole('navigation');

    this.dashboardLink = this.nav.getByRole('link', { name: 'Dashboard', exact: true });
    this.uploadFileLink = this.nav.getByRole('link', { name: 'Upload file', exact: true });
    this.myFilesLink = this.nav.getByRole('link', { name: 'My files', exact: true });
    this.requirementsLink = this.nav.getByRole('link', { name: 'Requirements', exact: true });
    this.architectureLink = this.nav.getByRole('link', { name: 'Architecture', exact: true });
    this.testingLink = this.nav.getByRole('link', { name: 'Testing', exact: true });
    this.logoutButton = this.nav.getByRole('button', { name: 'Logout', exact: true });

    // Works for any logged-in user (tester or manager)
    this.userEmail = this.nav.getByText(/\S+@\S+\.\S+/);
  }

  async goToDashboard() {
    await this.dashboardLink.click();
  }

  async goToUpload() {
    await this.uploadFileLink.click();
  }

  async goToFiles() {
    await this.myFilesLink.click();
  }

  async goToRequirements() {
    await this.requirementsLink.click();
  }

  async goToArchitecture() {
    await this.architectureLink.click();
  }

  async goToTesting() {
    await this.testingLink.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}