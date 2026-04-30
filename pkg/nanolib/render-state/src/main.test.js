import {describe, it, expect, jest} from 'bun:test';
import {renderState} from '@alwatr/render-state';

describe('renderState', () => {
  describe('basic rendering', () => {
    it('should call the render function for the matching state', () => {
      const result = renderState('loading', {
        loading: () => 'Loading...',
        success: () => 'Done!',
        _default: undefined,
      });
      expect(result).toBe('Loading...');
    });

    it('should call the correct render function for each state', () => {
      const renderRecord = {
        idle: () => 'idle-view',
        loading: () => 'loading-view',
        success: () => 'success-view',
        error: () => 'error-view',
        _default: undefined,
      };

      expect(renderState('idle', renderRecord)).toBe('idle-view');
      expect(renderState('loading', renderRecord)).toBe('loading-view');
      expect(renderState('success', renderRecord)).toBe('success-view');
      expect(renderState('error', renderRecord)).toBe('error-view');
    });
  });

  describe('_default fallback', () => {
    it('should use _default render when state is not found', () => {
      const result = renderState('unknown', {
        known: () => 'known-view',
        unknown: undefined,
        _default: () => 'default-view',
      });
      expect(result).toBe('default-view');
    });

    it('should return undefined when state is not found and _default is undefined', () => {
      const result = renderState('missing', {
        missing: undefined,
        _default: undefined,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('string alias (redirect)', () => {
    it('should follow a string alias to another state render', () => {
      const result = renderState('aliased', {
        aliased: 'target',
        target: () => 'target-view',
        _default: undefined,
      });
      expect(result).toBe('target-view');
    });

    it('should follow _default string alias to another state render', () => {
      const result = renderState('unknown', {
        unknown: undefined,
        fallback: () => 'fallback-view',
        _default: 'fallback',
      });
      expect(result).toBe('fallback-view');
    });

    it('should return undefined when _default string alias points to undefined', () => {
      const result = renderState('unknown', {
        unknown: undefined,
        missing: undefined,
        _default: 'missing',
      });
      expect(result).toBeUndefined();
    });
  });

  describe('thisArg binding', () => {
    it('should bind thisArg to the render function', () => {
      const context = {message: 'hello from context'};
      const result = renderState(
        'active',
        {
          active: function () {
            return this.message;
          },
          _default: undefined,
        },
        context,
      );
      expect(result).toBe('hello from context');
    });

    it('should use null as default thisArg', () => {
      const result = renderState('active', {
        active: function () {
          return this;
        },
        _default: undefined,
      });
      expect(result).toBeNull();
    });
  });

  describe('error handling', () => {
    it('should return undefined when render function throws', () => {
      const result = renderState('broken', {
        broken: () => {
          throw new Error('render error');
        },
        _default: undefined,
      });
      expect(result).toBeUndefined();
    });

    it('should return undefined when state render is not a function or string', () => {
      const result = renderState('bad', {
        // @ts-ignore — intentionally passing a non-function value for testing.
        bad: 42,
        _default: undefined,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('return types', () => {
    it('should support returning objects', () => {
      const result = renderState('data', {
        data: () => ({items: [1, 2, 3]}),
        _default: undefined,
      });
      expect(result).toEqual({items: [1, 2, 3]});
    });

    it('should support returning numbers', () => {
      const result = renderState('count', {
        count: () => 42,
        _default: undefined,
      });
      expect(result).toBe(42);
    });

    it('should support returning null', () => {
      const result = renderState('empty', {
        empty: () => null,
        _default: undefined,
      });
      expect(result).toBeNull();
    });
  });
});

describe('renderState — extra coverage', () => {
  describe('_default as function fallback', () => {
    it('should use _default function when state render is undefined', () => {
      const result = renderState('missing', {
        missing: undefined,
        _default: () => 'fallback-result',
      });
      expect(result).toBe('fallback-result');
    });

    it('should bind thisArg to _default function', () => {
      const ctx = {val: 'ctx-value'};
      const result = renderState(
        'missing',
        {
          missing: undefined,
          _default: function () {
            return this.val;
          },
        },
        ctx,
      );
      expect(result).toBe('ctx-value');
    });
  });

  describe('chained string aliases', () => {
    it('should follow a chain: state → alias → render function', () => {
      const result = renderState('a', {
        a: 'b',
        b: () => 'b-view',
        _default: undefined,
      });
      expect(result).toBe('b-view');
    });
  });

  describe('_default string alias chain', () => {
    it('should follow _default string alias to a render function', () => {
      const result = renderState('x', {
        x: undefined,
        y: () => 'y-view',
        _default: 'y',
      });
      expect(result).toBe('y-view');
    });
  });

  describe('edge cases', () => {
    it('should return undefined when render function returns undefined', () => {
      const result = renderState('state', {
        state: () => undefined,
        _default: undefined,
      });
      expect(result).toBeUndefined();
    });

    it('should return empty string when render function returns empty string', () => {
      const result = renderState('state', {
        state: () => '',
        _default: undefined,
      });
      expect(result).toBe('');
    });

    it('should return false when render function returns false', () => {
      const result = renderState('state', {
        state: () => false,
        _default: undefined,
      });
      expect(result).toBe(false);
    });

    it('should return 0 when render function returns 0', () => {
      const result = renderState('state', {
        state: () => 0,
        _default: undefined,
      });
      expect(result).toBe(0);
    });

    it('should handle render function returning an array', () => {
      const result = renderState('state', {
        state: () => [1, 2, 3],
        _default: undefined,
      });
      expect(result).toEqual([1, 2, 3]);
    });
  });
});
