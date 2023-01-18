export function registerServiceWorker(serviceWorkerPath: string): Promise<ServiceWorkerRegistration> | null {
  if (!('serviceWorker' in navigator)) return null;

  return navigator.serviceWorker.register(serviceWorkerPath);
}
