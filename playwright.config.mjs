import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  use: { baseURL: 'http://127.0.0.1:8791', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'python -m http.server 8791 --bind 127.0.0.1',
    url: 'http://127.0.0.1:8791',
    reuseExistingServer: false,
    stderr: 'ignore',
  },
});
