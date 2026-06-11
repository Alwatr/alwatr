import {createLogger} from '@alwatr/logger';
import {createDerivedSignal, type IReadonlySignal} from '@alwatr/signal';

import type {BindingValue} from './type.js';

/**
 * Service that acts as a central registry and manager for presentation ViewModels.
 *
 * It bridges rich domain state (signals) with the view layer by projecting
 * domain models into flat, DOM-ready primitive mappings within defined namespaces.
 */
class BindingService {
  /**
   * Scoped logger for internal service tracking and debugging.
   */
  protected readonly logger_ = createLogger('bind_service');

  /**
   * A registry map storing computed signals of view model records, keyed by their namespaces.
   */
  protected viewModels_ = new Map<string, IReadonlySignal<Record<string, BindingValue>>>();

  /**
   * Retrieves a registered ViewModel signal by its namespace.
   *
   * @param namespace The unique namespace of the ViewModel to retrieve (e.g., `'user'`, `'cart'`).
   * @returns The read-only computed signal of the ViewModel, or `null` if not registered.
   *
   * @example
   * ```typescript
   * const userViewModel = service_binding.getViewModel('user');
   * if (userViewModel) {
   *   console.log(userViewModel.get().fullName);
   * }
   * ```
   */
  getViewModel(namespace: string): IReadonlySignal<Record<string, BindingValue>> | null {
    return this.viewModels_.get(namespace) ?? null;
  }

  /**
   * Registers a presentation ViewModel.
   *
   * Creates a reactive, read-only computed projection from a single domain source signal
   * into a flat record of presentation-ready primitives (`BindingValue`), exposed under the given namespace.
   *
   * When the source domain signal emits, the projection is re-calculated automatically,
   * triggering updates in all elements bound to this namespace.
   *
   * @template S The type of the source domain signal's state.
   * @template T The type of the projected presentation view model record.
   *
   * @param namespace The unique namespace identifier for the view model (e.g., `'user'`).
   * @param source The source domain signal (e.g., a StateSignal or ComputedSignal).
   * @param projector A mapping function that projects the domain state `S` into presentation record `T`.
   *
   * @example
   * ```typescript
   * // Registers 'user.fullName' and 'user.cartIsEmpty' mapping:
   * service_binding.createViewModel('user', userSignal, (u) => ({
   *   fullName: `${u.firstName} ${u.lastName}`,
   *   cartIsEmpty: u.cart.length === 0,
   * }));
   *
   * // HTML consumption:
   * // <h2 bind_text="user.fullName"></h2>
   * // <button bind_attrib="disabled=user.cartIsEmpty">Checkout</button>
   * ```
   */
  createViewModel<S, T extends Record<string, BindingValue>>(
    namespace: string,
    source: IReadonlySignal<S>,
    projector: (value: S) => T,
  ): void {
    DEV_MODE && this.logger_.logMethodArgs?.('createViewModel', {namespace});

    if (this.viewModels_.has(namespace)) {
      DEV_MODE && this.logger_.accident('createViewModel', 'duplicate_namespace_rejected', {namespace});
      return;
    }

    const viewModelSignal = createDerivedSignal({
      name: `view_model:${namespace}`,
      source,
      projector,
    });
    this.viewModels_.set(namespace, viewModelSignal);
  }

  /**
   * Unregisters and destroys a registered ViewModel.
   *
   * Cleans up the computed signal to prevent memory leaks and releases associated resources.
   *
   * @param namespace The unique namespace identifier of the ViewModel to remove.
   *
   * @example
   * ```typescript
   * service_binding.removeViewModel('user');
   * ```
   */
  removeViewModel(namespace: string): void {
    DEV_MODE && this.logger_.logMethodArgs?.('removeViewModel', {namespace});

    const viewModel = this.viewModels_.get(namespace);
    if (viewModel) {
      viewModel.destroy();
      this.viewModels_.delete(namespace);
    }
  }
}

/**
 * Singleton instance of the BindingService.
 */
export const service_binding = new BindingService();
