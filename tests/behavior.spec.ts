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

    // 유저 목록이 테이블 행으로 존재하는지 확인
    await expect(page.locator('table tbody tr')).not.toHaveCount(0, { timeout: 10000 });
  });
});

test.describe('Routing 페이지 (TanStack Router) 동작 테스트', () => {
  test('초기 Home 페이지가 렌더링됨', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');

    // 콘텐츠 업로드 폼 제목 확인
    await expect(page.locator('h2:has-text("콘텐츠 업로드")')).toBeVisible();
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

    // Home으로 돌아왔는지 확인 (콘텐츠 업로드 폼)
    await expect(page.locator('h2:has-text("콘텐츠 업로드")')).toBeVisible();
  });

  test('Home 링크로 홈으로 복귀', async ({ page }) => {
    await page.goto('http://localhost:4321/rt');

    // Page A로 이동
    await page.click('a:has-text("Page A")');
    await expect(page.locator('h1:has-text("Page A")')).toBeVisible();

    // Home 링크 클릭
    await page.click('a:has-text("Home")');

    // Home으로 돌아왔는지 확인 (콘텐츠 업로드 폼)
    await expect(page.locator('h2:has-text("콘텐츠 업로드")')).toBeVisible();
  });
});

test.describe('콘텐츠 업로드 폼 동작 테스트', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/rt');
  });

  test('초기 상태에서 업로드 버튼이 비활성화됨', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: '업로드' });
    await expect(submitButton).toBeDisabled();
  });

  test('필수 필드 미입력 시 업로드 버튼이 비활성화 상태 유지', async ({ page }) => {
    // URL만 입력
    await page.fill('#url', 'https://example.com/product');

    const submitButton = page.getByRole('button', { name: '업로드' });
    await expect(submitButton).toBeDisabled();
  });

  test('모든 필수 필드 입력 시 업로드 버튼이 활성화됨', async ({ page }) => {
    // URL 입력
    await page.fill('#url', 'https://example.com/product');

    // 이미지 업로드
    const fileInput = page.locator('#image');
    await fileInput.setInputFiles({
      name: 'test-image.png',
      mimeType: 'image/png',
      buffer: Buffer.from('fake-image-content'),
    });

    // 상품명 입력
    await page.fill('#productName', '테스트 상품');

    // 태그 선택
    await page.click('text=Fashion');

    // 업로드 버튼이 활성화됨
    const submitButton = page.getByRole('button', { name: '업로드' });
    await expect(submitButton).toBeEnabled();
  });

  test('유효하지 않은 URL 입력 시 에러 메시지 표시', async ({ page }) => {
    // 유효하지 않은 URL 입력
    await page.fill('#url', 'invalid-url');
    await page.fill('#productName', '테스트'); // 다른 필드로 포커스 이동

    // 에러 메시지 확인
    await expect(page.locator('text=올바른 URL을 입력해주세요')).toBeVisible();
  });

  test('이미지 업로드 후 미리보기가 표시됨', async ({ page }) => {
    const fileInput = page.locator('#image');
    await fileInput.setInputFiles({
      name: 'test-image.png',
      mimeType: 'image/png',
      buffer: Buffer.from('fake-image-content'),
    });

    // 미리보기 이미지 확인
    await expect(page.locator('img[alt="미리보기"]')).toBeVisible();

    // 삭제 버튼 확인
    await expect(page.getByRole('button', { name: '이미지 삭제' })).toBeVisible();
  });

  test('이미지 삭제 버튼 클릭 시 미리보기가 제거됨', async ({ page }) => {
    // 이미지 업로드
    const fileInput = page.locator('#image');
    await fileInput.setInputFiles({
      name: 'test-image.png',
      mimeType: 'image/png',
      buffer: Buffer.from('fake-image-content'),
    });

    // 미리보기 확인
    await expect(page.locator('img[alt="미리보기"]')).toBeVisible();

    // 삭제 버튼 클릭
    await page.click('button[aria-label="이미지 삭제"]');

    // 미리보기가 사라지고 업로드 텍스트가 다시 표시됨
    await expect(page.locator('img[alt="미리보기"]')).not.toBeVisible();
    await expect(page.locator('text=클릭하여 이미지 업로드')).toBeVisible();
  });

  test('태그 선택/해제가 정상 동작함', async ({ page }) => {
    // Fashion 태그 선택
    await page.click('text=Fashion');
    const fashionCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(fashionCheckbox).toBeChecked();

    // Beauty 태그 추가 선택
    await page.click('text=Beauty');
    const beautyCheckbox = page.locator('input[type="checkbox"]').nth(1);
    await expect(beautyCheckbox).toBeChecked();

    // Fashion 태그 해제
    await page.click('text=Fashion');
    await expect(fashionCheckbox).not.toBeChecked();
  });

  test('폼 제출 성공 시 alert 표시', async ({ page }) => {
    // 모든 필수 필드 입력
    await page.fill('#url', 'https://example.com/product');

    const fileInput = page.locator('#image');
    await fileInput.setInputFiles({
      name: 'test-image.png',
      mimeType: 'image/png',
      buffer: Buffer.from('fake-image-content'),
    });

    await page.fill('#productName', '테스트 상품');
    await page.click('text=Fashion');

    // 버튼이 활성화될 때까지 대기
    const submitButton = page.getByRole('button', { name: '업로드' });
    await expect(submitButton).toBeEnabled();

    // alert 핸들러 설정 후 클릭 동시 실행
    await Promise.all([
      page.waitForEvent('dialog').then(async (dialog) => {
        expect(dialog.message()).toBe('콘텐츠가 업로드되었습니다!');
        await dialog.accept();
      }),
      submitButton.click({ force: true }),
    ]);
  });
});
