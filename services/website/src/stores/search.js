import { writable } from "svelte/store";

const createStore = () => {
  const { subscribe, set } = writable("");

  return {
    subscribe,
    search: (searchTerm) => set(searchTerm),
  };
};

export const searchStore = createStore();
