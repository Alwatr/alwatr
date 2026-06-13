import {describe, it, expect, beforeEach, afterEach} from 'bun:test';
import {GlobalRegistrator} from '@happy-dom/global-registrator';
import {createStateSignal} from '@alwatr/signal';
import {bootstrapDirectives} from '@alwatr/directive';
import {service_binding, setupBindDirectives} from '@alwatr/bind';

// Register DOM globals if not already done (guard against double-registration)
if (typeof document === 'undefined') {
  GlobalRegistrator.register();
}

/** Wait for the constructor's IIFE and microtasks to complete */
const waitForInit = () => new Promise((resolve) => setTimeout(resolve, 50));

describe('BindAttribDirective', () => {
  let signal;

  beforeEach(() => {
    // Ensure all directives are registered
    setupBindDirectives(true);
    signal = createStateSignal({
      name: 'test-player-signal-attrib',
      initialValue: {
        isPlaying: true,
        volume: 80,
        muted: false,
      },
    });
    service_binding.createViewModel('player', signal, (s) => ({
      isPlaying: s.isPlaying,
      volume: s.volume,
      muted: s.muted,
    }));
  });

  afterEach(() => {
    service_binding.removeViewModel('player');
    document.body.innerHTML = '';
  });

  it('should bind normal and negated attributes to element', async () => {
    const el = document.createElement('div');
    // hidden should be !isPlaying (negated)
    // data-volume should be volume (normal)
    // disabled should be muted (normal)
    el.setAttribute('bind_attrib', 'hidden=!player.isPlaying; data-volume=player.volume; disabled=player.muted');
    document.body.appendChild(el);

    // Bootstrap directives on the page
    bootstrapDirectives();
    await waitForInit();

    // Since isPlaying is true, !isPlaying is false. So hidden should NOT be present.
    expect(el.hasAttribute('hidden')).toBe(false);
    expect(el.getAttribute('data-volume')).toBe('80');
    expect(el.hasAttribute('disabled')).toBe(false);

    // Update state to isPlaying=false, muted=true
    signal.set({isPlaying: false, volume: 50, muted: true});
    await waitForInit();

    // Since isPlaying is false, !isPlaying is true. So hidden should be present.
    expect(el.hasAttribute('hidden')).toBe(true);
    expect(el.getAttribute('data-volume')).toBe('50');
    expect(el.hasAttribute('disabled')).toBe(true);
  });

  it('should tolerate whitespaces around equal signs and semicolons', async () => {
    const el = document.createElement('div');
    el.setAttribute(
      'bind_attrib',
      '  hidden  =  !  player.isPlaying  ;   data-volume   =   player.volume  ; disabled = player.muted ',
    );
    document.body.appendChild(el);

    bootstrapDirectives();
    await waitForInit();

    expect(el.hasAttribute('hidden')).toBe(false);
    expect(el.getAttribute('data-volume')).toBe('80');
    expect(el.hasAttribute('disabled')).toBe(false);

    // Update state to isPlaying=false, muted=true
    signal.set({isPlaying: false, volume: 55, muted: true});
    await waitForInit();

    expect(el.hasAttribute('hidden')).toBe(true);
    expect(el.getAttribute('data-volume')).toBe('55');
    expect(el.hasAttribute('disabled')).toBe(true);
  });
});
