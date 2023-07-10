import { createScheduled, debounce } from "@solid-primitives/scheduled";
import { createMemo, createRoot } from "solid-js";

const createDebouncedMemo = <T>(
  fn: () => T,
  timeout: number,
  defaultValue: T,
) => {
  const scheduled = createScheduled((fn) => debounce(fn, timeout));
  return createMemo<T>((previous) => {
    if (!scheduled()) {
      return previous;
    }
    return fn();
  }, defaultValue);
};

export const memoizeImmutable = <T extends object, U>(fn: (t: T) => U) => {
  const cache = new WeakMap<T, U>();
  return (t: T): U => {
    if (!cache.has(t)) {
      cache.set(t, fn(t));
    }
    return cache.get(t)!;
  };
};

export const noMemoize = <T extends object, U>(fn: (t: T) => U) => fn;

export const memoizeSolid = <T extends object, U>(fn: (t: T) => U) => {
  const cache = new WeakMap<T, () => U>();
  return (t: T): U => {
    if (!cache.has(t)) {
      cache.set(
        t,
        createRoot(() => createMemo(() => fn(t))),
      );
    }
    return cache.get(t)!();
  };
};

export const memoizeDebounce = <T extends object, U>(
  fn: (t: T) => U,
  timeout: number = 1000,
  defaultValue: U = "" as U,
) => {
  const cache = new WeakMap<T, () => U>();
  return (t: T): U => {
    if (!cache.has(t)) {
      cache.set(
        t,
        createRoot(() =>
          createDebouncedMemo(() => fn(t), timeout, defaultValue),
        ),
      );
    }
    return cache.get(t)!();
  };
};
