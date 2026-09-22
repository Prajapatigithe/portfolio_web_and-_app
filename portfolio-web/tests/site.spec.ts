import { test, expect } from '@playwright/test';
test('desktop content, project routes, resume and browser errors', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'I Build High-Quality',
  );
  await expect(page.locator('.service-card')).toHaveCount(10);
  await page.screenshot({ path: '/tmp/portfolio-desktop.png' });
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page
    .locator('#about img')
    .evaluate((img: HTMLImageElement) => img.decode());
  await page.locator('#about').screenshot({ path: '/tmp/portfolio-about.png' });
  await expect(page.locator('.project-card')).toHaveCount(3);
  await page.getByRole('link', { name: 'View Case Study' }).first().click();
  await expect(page).toHaveURL(/projects\/newtapri/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('NewTapri');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('NewTapri');
  const resume = await request.get('/Resume.pdf');
  expect(resume.ok()).toBeTruthy();
  await page.goto('/projects/missing');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Project not found',
  );
  expect(errors).toEqual([]);
});
test('mobile navigation and layouts do not overflow', async ({ page }) => {
  for (const width of [375, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Services', exact: true })
    .click();
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await page.screenshot({ path: '/tmp/portfolio-mobile.png', fullPage: true });
});
test('form validates and does not claim delivery without backend', async ({
  page,
}) => {
  await page.goto('/#contact');
  await page.getByRole('button', { name: 'Send Project Inquiry' }).click();
  expect(
    await page
      .locator('input[name="name"]')
      .evaluate((e: HTMLInputElement) => e.validity.valueMissing),
  ).toBeTruthy();
  await page.getByLabel('Your name').fill('Test Client');
  await page.getByLabel('Email address').fill('client@example.com');
  await page.getByLabel('Project type').selectOption('New Mobile App');
  await page.getByLabel('Budget range').selectOption('Not sure yet');
  await page.getByLabel('Expected timeline').selectOption('Within 1 month');
  await page
    .getByLabel('Your project idea')
    .fill('A mobile application for my local business.');
  await page.getByRole('button', { name: 'Send Project Inquiry' }).click();
  await expect(page.getByRole('alert')).toContainText('not connected yet');
  await expect(page.getByLabel('Your name')).toHaveValue('Test Client');
});
test('admin fails closed when unconfigured', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.getByText('Connect Supabase using')).toBeVisible();
  await expect(page.locator('table')).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex,nofollow',
  );
});
