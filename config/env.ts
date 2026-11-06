import dotenv from 'dotenv';
import path from 'path';

const VALID_ENVS = ['sit', 'uat', 'bug'] as const;
type TestEnv = (typeof VALID_ENVS)[number];

const testEnv = (process.env.TEST_ENV ?? `sit`).toLowerCase();

if (!VALID_ENVS.includes(testEnv as TestEnv)) {
  throw new Error(`Invalid TEST_ENV "${testEnv}". Allowed values: ${VALID_ENVS.join(', ')}`);
}

const rootDir = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(rootDir, 'envs', `.env.${testEnv}`) });
dotenv.config({ path: path.join(rootDir, '.env') });

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  testEnv: testEnv as TestEnv,
  baseURL: required('BASE_URL'),
  testerEmail: required('TESTER_EMAIL'),
  testerPassword: required('TESTER_PASSWORD'),
  managerEmail: required('MANAGER_EMAIL'),
  managerPassword: required('MANAGER_PASSWORD'),
};
