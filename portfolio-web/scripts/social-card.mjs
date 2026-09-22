import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(
  `<html><body style="margin:0;background:#09090e;font-family:Arial,sans-serif;color:#f5f2fa"><div style="height:630px;box-sizing:border-box;padding:70px 85px;background:radial-gradient(ellipse at 95% 50%,#4e296c77,transparent 60%);border:1px solid #372a46"><div style="font-size:22px;color:#c8b1e9">Ankit Kumar<span style="color:#a775f2">.</span></div><p style="margin-top:65px;font-size:13px;color:#ad88df;letter-spacing:3px">REACT NATIVE DEVELOPER · ANDROID & IOS</p><h1 style="font-size:62px;letter-spacing:-2px;line-height:1.14;margin:22px 0">Your idea.<br/>A high-quality mobile app.<br/><span style="color:#b798f3">Built for your business.</span></h1><p style="font-size:18px;color:#a49bab;margin-top:35px">Available for freelance projects ↗</p></div></body></html>`,
);
await page.screenshot({ path: 'public/social-card.png' });
await browser.close();
