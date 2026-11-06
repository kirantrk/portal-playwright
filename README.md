# portal-playwright

Playwright + TypeScript test automation framework for the Cloud Document Portal
([rafi9898/udemy-course-app](https://github.com/rafi9898/udemy-course-app)).

## Prerequisites

- Node.js 18 or higher (check with `node -v`)
- Git
- A running instance of the portal (see `envs/.env.sit` for the SIT URL)

## Setup

```bash
git clone https://github.com/kirantrk/portal-playwright.git
cd portal-playwright
npm install
npx playwright install
```

## Configuration

Non-secret values (the base URL) live in `envs/.env.<name>`.
Secrets live in a root `.env` file that is gitignored and never committed.

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```
   On Windows PowerShell: `Copy-Item .env.example .env`
2. Fill in the credentials in `.env`:
   ```
   TESTER_EMAIL=
   TESTER_PASSWORD=
   MANAGER_EMAIL=
   MANAGER_PASSWORD=
   ```

### Environments

`TEST_ENV` selects which `envs/` file is loaded. Allowed values: `sit`, `uat`, `bug`.
It defaults to `sit`. Any other value fails fast with an error.

## Running tests

```bash
# all tests, chromium
npx playwright test --project=chromium

# smoke tests only
npx playwright test --grep @smoke

# watch the browser
npx playwright test --headed

# another environment (bash)
TEST_ENV=uat npx playwright test

# another environment (PowerShell)
$env:TEST_ENV="uat"; npx playwright test
```

Open the last HTML report:

```bash
npx playwright show-report
```

## Project structure

```
config/     typed environment loader (config/env.ts)
envs/       per-environment non-secret values (.env.sit, .env.uat, .env.bug)
pages/      page objects (BasePage, LoginPage)
tests/      test specs (tests/auth/login.spec.ts)
fixtures/   custom fixtures (added in later phases)
data/       test data (added in later phases)
utils/      helpers
```

## Conventions

- Page objects hold locators and actions. Assertions stay in the tests.
- Prefer `getByRole` and `getByLabel` locators.
- Nothing reads `process.env` directly. Use `env` from `config/env.ts`.
- Format and lint before committing: `npx prettier --write .` and `npm run lint`.