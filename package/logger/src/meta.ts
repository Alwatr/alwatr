declare global {
  interface Window {
    Vatr?: {
      registeredList?: Array<{
        name: string,
        version: string,
      }>;
    }
  }
}

export const vatrRegisteredList = window.Vatr?.registeredList || [];
window.Vatr ??= {};
window.Vatr.registeredList = vatrRegisteredList;

vatrRegisteredList.push({
  name: '@vatr/router',
  version: '{{VATR_VERSION}}', // TODO: replace with real version at release time.
});
