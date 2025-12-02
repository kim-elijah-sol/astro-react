import { test, expect } from '@playwright/test';

test.describe('Navigation 렌더링 테스트', () => {
  test('네비게이션 링크가 올바르게 렌더링됨', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('nav a:first-of-type')).toHaveText('posts');
    await expect(page.locator('nav a:nth-child(2)')).toHaveText('users');
    await expect(page.locator('nav a:last-of-type')).toHaveText('routing');
  });

  test('네비게이션 링크에 올바른 href 속성이 있음', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    await expect(page.locator('nav a:first-of-type')).toHaveAttribute('href', '/');
    await expect(page.locator('nav a:nth-child(2)')).toHaveAttribute('href', '/users');
    await expect(page.locator('nav a:last-of-type')).toHaveAttribute('href', '/rt');
  });
});

test.describe('Layout 렌더링 테스트', () => {
  test('HTML 기본 구조가 올바르게 렌더링됨', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // html 태그의 lang 속성 확인
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // body 태그의 id 확인
    await expect(page.locator('body')).toHaveAttribute('id', '__astro');

    // title 확인
    await expect(page).toHaveTitle('Astro Basics');
  });

  test('clay-theme 속성이 설정됨', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    await expect(page.locator('html')).toHaveAttribute('data-clay-theme', 'light-only');
  });
});

test.describe('Posts 페이지 렌더링 테스트', () => {
  test('포스트 목록이 렌더링됨', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // 포스트 아이템들이 li로 렌더링됨
    const postItems = page.locator('ul li');
    await expect(postItems).not.toHaveCount(0, { timeout: 10000 });
  });
});

test.describe('Users 페이지 렌더링 테스트', () => {
  test('유저 목록이 렌더링됨', async ({ page }) => {
    await page.goto('http://localhost:4321/users');

    // ul 요소가 존재하는지 확인
    await expect(page.locator('ul')).toBeVisible({ timeout: 10000 });

    // 유저 아이템들이 li로 렌더링됨
    const userItems = page.locator('ul li');
    await expect(userItems).not.toHaveCount(0, { timeout: 10000 });
  });

  test('유저 아이템에 name, username, email 정보가 표시됨', async ({ page }) => {
    await page.goto('http://localhost:4321/users');

    // 첫 번째 유저 아이템 확인
    const firstUserItem = page.locator('ul li').first();
    await expect(firstUserItem).toBeVisible({ timeout: 10000 });

    // 유저 정보 형식 확인: "name (username) - email"
    const userText = await firstUserItem.textContent();
    expect(userText).toMatch(/.+\s\(.+\)\s-\s.+@.+/);
  });
});

test.describe('Routing 페이지 렌더링 테스트', () => {
  test('TanStack Router 네비게이션이 렌더링됨', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');

    // 라우터 내비게이션 링크들 확인
    await expect(page.locator('a:has-text("Home")')).toBeVisible();
    await expect(page.locator('a:has-text("Page A")')).toBeVisible();
    await expect(page.locator('a:has-text("Page B")')).toBeVisible();
  });

  test('Home 페이지 컴포넌트가 렌더링됨', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');

    await expect(page.locator('h1:has-text("Home")')).toBeVisible();
  });

  test('Page A 컴포넌트가 렌더링됨', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');
    await page.click('a:has-text("Page A")');

    await expect(page.locator('h1:has-text("Page A")')).toBeVisible();
    await expect(page.locator('p:has-text("Search param")')).toBeVisible();
  });

  test('Page B 컴포넌트가 렌더링됨', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');
    await page.click('a:has-text("Page B")');

    await expect(page.locator('h1:has-text("Page B")')).toBeVisible();
    await expect(page.locator('button:has-text("이전 페이지로")')).toBeVisible();
    await expect(page.locator('button:has-text("A 페이지로")')).toBeVisible();
  });
});
