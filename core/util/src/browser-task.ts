const {port1, port2} = new MessageChannel();
port2.start();

export const browserTask = (): Promise<void> => {
  return new Promise((resolve) => {
    const uid = Math.random();
    const onMessage = (event: MessageEvent) => {
      if (event.data !== uid) {
        return;
      }
      port2.removeEventListener('message', onMessage);
      resolve();
    };
    port2.addEventListener('message', onMessage);
    port1.postMessage(uid);
  });
};
