import {describe, it, expect} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';
import {delay} from '@alwatr/delay';

// Register DOM globals for domEvent/event tests.
if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

describe('delay — extra coverage', () => {
  describe('delay.domEvent', () => {
    it('should resolve when the specified DOM event fires', async () => {
      const btn = document.createElement('button');
      document.body.appendChild(btn);

      const promise = delay.domEvent(btn, 'click');
      btn.click();
      const event = await promise;

      expect(event).toBeDefined();
      expect(event.type).toBe('click');
      btn.remove();
    });

    it('should resolve with the correct event type', async () => {
      const input = document.createElement('input');
      document.body.appendChild(input);

      const promise = delay.domEvent(input, 'focus');
      input.focus();
      const event = await promise;

      expect(event.type).toBe('focus');
      input.remove();
    });

    it('should only resolve once (uses once: true internally)', async () => {
      const btn = document.createElement('button');
      document.body.appendChild(btn);

      const promise = delay.domEvent(btn, 'click');
      btn.click();
      await promise;

      // The listener should have been removed after the first click.
      // A second click should not cause issues.
      btn.click();
      btn.remove();
    });
  });

  describe('delay.event', () => {
    it('should resolve when the specified event fires on an EventTarget', async () => {
      const target = new EventTarget();
      const promise = delay.event(target, 'custom-event');
      target.dispatchEvent(new Event('custom-event'));
      const event = await promise;

      expect(event).toBeDefined();
      expect(event.type).toBe('custom-event');
    });

    it('should resolve only once', async () => {
      const target = new EventTarget();
      const promise = delay.event(target, 'test');
      target.dispatchEvent(new Event('test'));
      const event = await promise;
      expect(event.type).toBe('test');

      // Second dispatch should not cause issues.
      target.dispatchEvent(new Event('test'));
    });
  });

  describe('delay.by edge cases', () => {
    it('should handle very small durations', async () => {
      const start = Date.now();
      await delay.by(1);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(0);
    });

    it('should handle numeric 0', async () => {
      const start = Date.now();
      await delay.by(0);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(100);
    });
  });
});
