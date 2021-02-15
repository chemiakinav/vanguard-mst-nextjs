import { types, applySnapshot } from "mobx-state-tree";
import { LibraryStore, initialLibraryState } from "./LibraryStore";
import { BookStore, initialBookState } from "./BookStore";
import { useMemo } from "react";

let store;

export const VanguardStore = types.model("VanguardStore", {
  libraryStore: LibraryStore,
  bookStore: BookStore,
});

const initialState = {
  bookStore: initialBookState,
  libraryStore: initialLibraryState,
};
export function initializeStore(snapshot = null) {
  const _store = store ?? VanguardStore.create(initialState);
  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  // For SSG and SSR always create a new store TODO: research
  // if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return store;
}
export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
