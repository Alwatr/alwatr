export async function unregisterServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    console.log('Service worker not supported');
    return;
  }

  const registrations = await navigator.serviceWorker.getRegistrations();
  for (const registration of registrations) {
    console.log('Unregister service worker', registration);
    await registration.unregister();
  }
}

export async function unregisterAlwatrServiceWorker(): Promise<void> {
  if (globalThis.Alwatr != null) {
    return unregisterAlwatrServiceWorker();
  }
}
