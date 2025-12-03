import { test, expect } from '@playwright/test';

test.describe('Navigation 동작 테스트', () => {
  test('posts 링크 클릭 시 홈페이지로 이동', async ({ page }) => {
    await page.goto('http://localhost:4321/users');
    await page.click('a:has-text("posts")');

    await expect(page).toHaveURL('http://localhost:4321/');
  });

  test('users 링크 클릭 시 users 페이지로 이동', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.click('a:has-text("users")');

    await expect(page).toHaveURL('http://localhost:4321/users');
  });

  test('routing 링크 클릭 시 routing 페이지로 이동', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.click('a:has-text("routing")');

    await expect(page).toHaveURL('http://localhost:4321/rt');
  });
});

test.describe('Posts 페이지 동작 테스트', () => {
  test('포스트 목록이 로드됨', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // 포스트 목록이 로드될 때까지 대기
    await expect(page.locator('ul li')).not.toHaveCount(0, { timeout: 10000 });
  });
});

test.describe('Users 페이지 동작 테스트', () => {
  test('유저 목록이 렌더링됨', async ({ page }) => {
    await page.goto('http://localhost:4321/users');

    // 유저 목록이 존재하는지 확인
    await expect(page.locator('ul li')).not.toHaveCount(0, { timeout: 10000 });
  });
});

test.describe('Routing 페이지 (TanStack Router) 동작 테스트', () => {
  test('초기 Home 페이지가 렌더링됨', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');

    // Home 제목 확인
    await expect(page.locator('h1:has-text("Home")')).toBeVisible();
  });

  test('Page A 링크 클릭 시 Page A로 이동하고 search param 표시', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');

    // Page A 링크 클릭
    await page.click('a:has-text("Page A")');

    // Page A 제목 확인
    await expect(page.locator('h1:has-text("Page A")')).toBeVisible();

    // search param이 표시되는지 확인 (p 태그 내의 텍스트만 확인)
    await expect(page.locator('p:has-text("Hello from RootLayout")')).toBeVisible();
  });

  test('Page B 링크 클릭 시 Page B로 이동', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');

    // Page B 링크 클릭
    await page.click('a:has-text("Page B")');

    // Page B 제목 확인
    await expect(page.locator('h1:has-text("Page B")')).toBeVisible();
  });

  test('Page B에서 "A 페이지로" 버튼 클릭 시 Page A로 이동', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');

    // Page B로 이동
    await page.click('a:has-text("Page B")');
    await expect(page.locator('h1:has-text("Page B")')).toBeVisible();

    // "A 페이지로" 버튼 클릭
    await page.click('button:has-text("A 페이지로")');

    // Page A로 이동 확인
    await expect(page.locator('h1:has-text("Page A")')).toBeVisible();

    // search param "Hello from B" 확인 (p 태그 내의 텍스트만 확인)
    await expect(page.locator('p:has-text("Hello from B")')).toBeVisible();
  });

  test('Page B에서 "이전 페이지로" 버튼으로 히스토리 뒤로가기', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');

    // Home에서 Page B로 이동
    await page.click('a:has-text("Page B")');
    await expect(page.locator('h1:has-text("Page B")')).toBeVisible();

    // "이전 페이지로" 버튼 클릭
    await page.click('button:has-text("이전 페이지로")');

    // Home으로 돌아왔는지 확인
    await expect(page.locator('h1:has-text("Home")')).toBeVisible();
  });

  test('Home 링크로 홈으로 복귀', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');

    // Page A로 이동
    await page.click('a:has-text("Page A")');
    await expect(page.locator('h1:has-text("Page A")')).toBeVisible();

    // Home 링크 클릭
    await page.click('a:has-text("Home")');

    // Home으로 돌아왔는지 확인
    await expect(page.locator('h1:has-text("Home")')).toBeVisible();
  });
});
