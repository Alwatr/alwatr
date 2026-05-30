import {createLogger} from '@alwatr/logger';
import {createComputedSignal, type IReadonlySignal} from '@alwatr/signal';
import type {BindingValue} from './type.js';

class BindingService {
  protected readonly logger_ = createLogger('bind_service');

  protected viewModels_ = new Map<string, IReadonlySignal<Record<string, BindingValue>>>();

  /**
   * Retrieves a registered ViewModel by its namespace. Returns null if not found.
   *
   * @param namespace The namespace of the ViewModel to retrieve.
   * @returns The ViewModel signal or null if not found.
   *
   * @example
   * const userViewModel = service_binding.getViewModel('user');
   */
  getViewModel(namespace: string): IReadonlySignal<Record<string, BindingValue>> | null {
    return this.viewModels_.get(namespace) ?? null;
  }

  /**
   * Registers a presentation ViewModel: a reactive projection from ONE domain signal
   * into a flat record of presentation-ready primitives, exposed under `namespace.*`.
   *
   * @example
   *   createViewModel('user', userSignal, (u) => ({
   *     fullName: `${u.firstName} ${u.lastName}`,
   *     cartIsEmpty: u.cart.length === 0,
   *   }));
   *   // → <h2 bind-text="user.fullName"></h2>
   */
  createViewModel<S, T extends Record<string, BindingValue>>(
    namespace: string,
    source: IReadonlySignal<S>,
    project: (value: S) => T,
  ): void {
    const viewModelSignal = createComputedSignal({
      name: `view_model:${namespace}`,
      deps: [source],
      get: () => project(source.get()),
    });
    this.viewModels_.set(namespace, viewModelSignal);
  }

  removeViewModel(namespace: string): void {
    const viewModel = this.viewModels_.get(namespace);
    if (viewModel) {
      if ('destroy' in viewModel) {
        viewModel.destroy();
      }
      this.viewModels_.delete(namespace);
    }
  }
}

export const service_binding = new BindingService();
