const rootId = 'alwatr_pwa';

const _makeRootElement = (): HTMLDivElement => {
  const el = document.createElement('div');
  el.id = rootId;
  document.body.append(el);
  return el;
};

export const rootElement = document.getElementById(rootId) ?? _makeRootElement();
