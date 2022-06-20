export function useStarbeam<T>(
  definition: (parent: ReactiveElement) => () => T,
  description?: string | DescriptionArgs
): T;
export function useStarbeam<T>(
  definition: () => () => T,
  description?: string | DescriptionArgs
): T;

export declare class ReactiveElement {
  readonly on: OnLifecycle;

  attach(lifecycle: DebugLifecycle): void;
  use<T>(resource: ResourceConstructor<T>): Resource<T>;
  refs<R extends RefsTypes>(refs: R): RefsRecordFor<R>;
}

export type Resource<T> = Reactive<T>;
export type ResourceConstructor<T> = Linkable<Resource<T>>;

interface OnLifecycle extends OnCleanup {
  readonly cleanup: (finalizer: Callback) => Unsubscribe;
  readonly ready: (ready: Callback) => void;
  readonly attached: (attached: Callback) => void;
}

export interface OnCleanup {
  cleanup(finalizer: () => void): Unsubscribe;
}

export type Unsubscribe = () => void;
type Callback<T = void> = (instance: T) => void;

export declare class Linkable<T> {
  create({ owner }: { owner: object }): T;
  map<U>(mapper: (value: T) => U): Linkable<U>;
}

export declare class ReactiveResource<T> implements Reactive<T> {
  #reactive: 'nominal';
}

declare const REACTIVE: unique symbol;
type REACTIVE = typeof REACTIVE;

export interface ReactiveProtocol {
  readonly [REACTIVE]: unknown;
}

export interface Reactive<T> extends ReactiveProtocol {
  readonly current: T;
}

export const reactive: {
  Map<K, V>(description?: string): Map<K, V>;
  Set<V>(description?: string): Set<V>;
  array<T>(items: T[], description?: string): T[];
  object<T>(object: T, description?: string): T;
};

export function Cell<T>(value: T, description?: string): Cell<T>;

export interface Cell<T> extends Reactive<T> {
  current: T;
  set(value: T): void;
  update(updater: (previous: T) => T): void;
}

export function Resource<T>(
  create: ResourceBlueprint<T>,
  description?: string
): ResourceConstructor<T>;

export interface ResourceBlueprint<T> {
  (builder: CleanupTarget): () => T;
}

export interface CleanupTarget {
  link(child: object): Unsubscribe;
  readonly on: OnCleanup;
}
