import { test, expect } from '@playwright/test';
test.use({ baseURL: 'http://127.0.0.1:5174' });
const user = {
  id: '00000000-0000-0000-0000-000000000001',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'admin@example.com',
  app_metadata: {},
  user_metadata: {},
  created_at: '2026-01-01T00:00:00Z',
};
const lead = {
  id: 'lead-1',
  name: 'Test Client',
  email: 'client@example.com',
  company: 'Example',
  project_type: 'New Mobile App',
  budget: 'Not sure yet',
  timeline: 'Within 1 month',
  message: 'Please build a mobile app for our local business.',
  status: 'new',
  created_at: '2026-09-22T00:00:00Z',
};
test('configured inquiry shows real response-based success and retry error', async ({
  page,
}) => {
  let fail = true;
  await page.route(
    'https://portfolio-test.supabase.co/rest/v1/rpc/submit_lead',
    async route => {
      expect(route.request().postDataJSON().payload.name).toBe('Test Client');
      await route.fulfill(
        fail
          ? { status: 400, json: { message: 'Test failure' } }
          : { status: 204, body: '' },
      );
    },
  );
  await page.goto('/#contact');
  await page.getByLabel('Your name').fill('Test Client');
  await page.getByLabel('Email address').fill('client@example.com');
  await page.getByLabel('Project type').selectOption('New Mobile App');
  await page.getByLabel('Budget range').selectOption('Not sure yet');
  await page.getByLabel('Expected timeline').selectOption('Within 1 month');
  await page.getByLabel('Your project idea').fill(lead.message);
  await page.getByRole('button', { name: 'Send Project Inquiry' }).click();
  await expect(page.getByRole('alert')).toContainText('could not be sent');
  fail = false;
  await page.getByRole('button', { name: 'Send Project Inquiry' }).click();
  await expect(page.getByText('Thanks! Your project inquiry')).toBeVisible();
  await expect(page.getByLabel('Your name')).toHaveValue('');
});
test('admin login, leads, status update and logout', async ({ page }) => {
  let leadStatus = 'new';
  await page.route('https://portfolio-test.supabase.co/**', async route => {
    const url = route.request().url();
    if (url.includes('/auth/v1/token'))
      return route.fulfill({
        json: {
          access_token: 'test-token',
          refresh_token: 'test-refresh',
          expires_in: 3600,
          token_type: 'bearer',
          user,
        },
      });
    if (url.includes('/auth/v1/user')) return route.fulfill({ json: user });
    if (url.includes('/auth/v1/logout'))
      return route.fulfill({ status: 204, body: '' });
    if (url.includes('/rpc/is_admin')) return route.fulfill({ json: true });
    if (url.includes('/rest/v1/leads')) {
      if (route.request().method() === 'PATCH') {
        leadStatus = route.request().postDataJSON().status;
        return route.fulfill({ json: { id: 'lead-1' } });
      }
      return route.fulfill({ json: [{ ...lead, status: leadStatus }] });
    }
    return route.fulfill({ status: 404, body: '' });
  });
  await page.goto('/admin');
  await page.getByLabel('Email', { exact: true }).fill('admin@example.com');
  await page.getByLabel('Password').fill('test-password');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByText('Test Client', { exact: true })).toBeVisible();
  await page.getByLabel('Status for Test Client').selectOption('contacted');
  await expect(page.getByLabel('Status for Test Client')).toHaveValue(
    'contacted',
  );
  expect(leadStatus).toBe('contacted');
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(
    page.getByRole('heading', { name: 'Admin login' }),
  ).toBeVisible();
  await expect(page.getByRole('table')).toHaveCount(0);
});
