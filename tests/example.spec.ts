import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  await expect(page.locator('a:first-of-type')).toHaveText('posts');
});
