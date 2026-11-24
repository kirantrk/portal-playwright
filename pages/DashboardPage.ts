import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NavBar } from './components/NavBar';

export class DashboardPage extends BasePage {
  readonly nav: NavBar;

  readonly welcomeHeading: Locator;
  readonly bugModeBanner: Locator;
  readonly uploadCard: Locator;
  readonly myFilesCard: Locator;
  readonly log_out:Locator

  constructor(page: Page) {
    super(page);
    this.nav = new NavBar(page);

    this.welcomeHeading = page.getByRole('heading', { name: /^Welcome,/ });
    this.bugModeBanner = page.getByText(/BUG_MODE is enabled/);

    // The nav links have the same names, so identify the cards by their description text
    this.uploadCard = page.getByRole('link').filter({ hasText: 'Submit PDF, PNG or JPG files to S3' });
    this.myFilesCard = page.getByRole('link').filter({ hasText: 'View upload dates, file sizes and downloads' });
    this.log_out=page.getByRole("button" ,{name:'Logout'});
  }

  async open() {
    await this.goto('/dashboard');
  }

  async waitForLoaded() {
    await this.welcomeHeading.waitFor();
  }

  async logOut():Promise<void>{

    await this.log_out.click()
  }
}