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
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('NewsTapri');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('NewsTapri');
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
test('WhatsApp form validates, prepares the complete brief, and preserves input', async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.open = () => null; // Simulate a blocked popup; never contact WhatsApp in tests.
  });
  await page.goto('/#contact');
  const submit = page.getByRole('button', { name: 'Continue on WhatsApp' });
  await submit.click();
  expect(
    await page
      .locator('input[name="name"]')
      .evaluate((input: HTMLInputElement) => input.validity.valueMissing),
  ).toBeTruthy();
  await page.getByLabel('Your name').fill('Test Client');
  await page.getByLabel('Email address').fill('client@example.com');
  await page.getByLabel('Company name').fill('Arts & Crafts');
  await page.getByLabel('Project type').selectOption('New Mobile App');
  await page.getByLabel('Budget range').selectOption('$500–$1,000');
  await page.getByLabel('Expected timeline').selectOption('Within 1 month');
  await page
    .getByLabel('Your project idea')
    .fill('A marketplace app for gifts & handmade items.');
  await submit.click();
  await expect(page.getByRole('status')).toContainText(
    'Nothing has been sent yet',
  );
  const url = new URL(
    (await page
      .getByRole('link', { name: 'Open WhatsApp', exact: true })
      .getAttribute('href'))!,
  );
  expect(url.origin + url.pathname).toBe('https://wa.me/919889091773');
  const text = url.searchParams.get('text');
  for (const value of [
    'Test Client',
    'client@example.com',
    'Arts & Crafts',
    'New Mobile App',
    '$500–$1,000',
    'Within 1 month',
    'A marketplace app for gifts & handmade items.',
  ])
    expect(text).toContain(value);
  await expect(page.getByLabel('Your name')).toHaveValue('Test Client');
  await expect(page.getByRole('alert')).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .locator('.inquiry-form')
    .screenshot({ path: '/tmp/portfolio-whatsapp-form.png' });
  await page
    .getByLabel('Your project idea')
    .fill('A revised project brief for our local business.');
  await expect(
    page.getByRole('link', { name: 'Open WhatsApp', exact: true }),
  ).toHaveCount(0);
});
test('project previews use supplied references and mobile screenshots', async ({
  page,
}) => {
  await page.goto('/#projects');
  await expect(page.locator('.project-card img')).toHaveCount(2);
  for (const image of await page.locator('.project-card img').all())
    await image.evaluate((img: HTMLImageElement) => img.decode());
  await expect(
    page.getByRole('link', { name: 'Visit AchiDeal', exact: true }),
  ).toHaveAttribute('href', 'https://achideal.com/');
  await expect(
    page.getByRole('link', { name: 'View published project', exact: true }),
  ).toHaveAttribute(
    'href',
    'https://www.radomsdigital.com/portfolio/newstapri',
  );
  await page
    .locator('#projects')
    .screenshot({ path: '/tmp/portfolio-updated-projects.png' });
  await page.goto('/projects/achideal');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('AchiDeal');
  await expect(page.locator('.screenshot-gallery img')).toHaveCount(2);
  for (const image of await page.locator('.screenshot-gallery img').all())
    await image.evaluate((img: HTMLImageElement) => img.decode());
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
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
