// Define DEV_MODE globally so that TS source files can run directly in bun test
globalThis.DEV_MODE = true;

import {describe, it, expect, beforeEach, afterEach} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';
import {createStateSignal} from '@alwatr/signal';
import {bootstrapDirectives} from '@alwatr/directive';
import {service_binding, setupBindDirectives} from './main.js';

// Register DOM globals if not already done (guard against double-registration)
if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

/** Wait for the constructor's IIFE and microtasks to complete */
const waitForInit = () => new Promise((resolve) => setTimeout(resolve, 50));

describe('BindCssVarDirective', () => {
  let signal;

  beforeEach(() => {
    // Ensure all directives are registered
    setupBindDirectives(true);
    signal = createStateSignal({
      name: 'test-player-signal',
      initialValue: {
        progress: '30%',
        color: 'red',
      },
    });
    service_binding.createViewModel('player', signal, (s) => ({
      progress: s.progress,
      color: s.color,
    }));
  });

  afterEach(() => {
    service_binding.removeViewModel('player');
    document.body.innerHTML = '';
  });

  it('should bind a single CSS variable to element style', async () => {
    const el = document.createElement('div');
    el.setAttribute('bind_css_var', '--player-progress: player.progress');
    document.body.appendChild(el);

    // Bootstrap directives on the page to find the newly added element
    bootstrapDirectives();
    await waitForInit();

    expect(el.style.getPropertyValue('--player-progress')).toBe('30%');

    // Update state
    signal.set({progress: '50%', color: 'blue'});
    await waitForInit();

    expect(el.style.getPropertyValue('--player-progress')).toBe('50%');
  });

  it('should bind multiple CSS variables to element style', async () => {
    const el = document.createElement('div');
    el.setAttribute('bind_css_var', '--player-progress: player.progress; --player-color: player.color');
    document.body.appendChild(el);

    bootstrapDirectives();
    await waitForInit();

    expect(el.style.getPropertyValue('--player-progress')).toBe('30%');
    expect(el.style.getPropertyValue('--player-color')).toBe('red');

    // Update state
    signal.set({progress: '80%', color: 'green'});
    await waitForInit();

    expect(el.style.getPropertyValue('--player-progress')).toBe('80%');
    expect(el.style.getPropertyValue('--player-color')).toBe('green');
  });

  it('should remove the CSS variable when value is null or undefined', async () => {
    const el = document.createElement('div');
    el.setAttribute('bind_css_var', '--player-progress: player.progress');
    document.body.appendChild(el);

    bootstrapDirectives();
    await waitForInit();

    expect(el.style.getPropertyValue('--player-progress')).toBe('30%');

    // Set progress to null
    signal.set({progress: null, color: 'red'});
    await waitForInit();

    expect(el.style.getPropertyValue('--player-progress')).toBe('');

    // Set progress to undefined
    signal.set({progress: undefined, color: 'red'});
    await waitForInit();

    expect(el.style.getPropertyValue('--player-progress')).toBe('');
  });

  it('should defer binding when lazy_bind is present', async () => {
    const originalIO = globalThis.IntersectionObserver;
    let intersectCallback;
    globalThis.IntersectionObserver = class MockIO {
      constructor(cb) {
        intersectCallback = cb;
      }
      observe() {}
      disconnect() {}
    };

    const el = document.createElement('div');
    el.setAttribute('bind_css_var', '--player-progress: player.progress');
    el.setAttribute('lazy_bind', '');
    document.body.appendChild(el);

    bootstrapDirectives();
    await waitForInit();

    // Should not be bound yet since it hasn't intersected
    expect(el.style.getPropertyValue('--player-progress')).toBe('');

    // Trigger intersection
    if (intersectCallback) {
      intersectCallback([{isIntersecting: true}]);
    }
    await waitForInit();

    // Now it should be bound
    expect(el.style.getPropertyValue('--player-progress')).toBe('30%');

    // Clean up mock
    globalThis.IntersectionObserver = originalIO;
  });
});
