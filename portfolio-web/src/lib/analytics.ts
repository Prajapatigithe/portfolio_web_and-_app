export function initializeAnalytics() {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
  // Load only after the site owner has obtained any required visitor consent.
  if (
    !id ||
    !/^G-[A-Z0-9]+$/.test(id) ||
    localStorage.getItem('analytics-consent') !== 'granted'
  )
    return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
  const target = window as Window & { dataLayer?: unknown[] };
  target.dataLayer = target.dataLayer || [];
  function gtag(...args: unknown[]) {
    target.dataLayer!.push(args);
  }
  gtag('js', new Date());
  gtag('config', id);
}
