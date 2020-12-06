import { writable } from "svelte/store";

const createStore = () => {
  const { subscribe, update } = writable({
    scrollBarProgress: {
      isVisible: false,
      readingTime: {},
    },
  });

  return {
    subscribe,
    setScrollBarProgressVisible: (isVisible, readingTime) =>
      update((store) => ({
        ...store,
        scrollBarProgress: {
          isVisible,
          readingTime,
        },
      })),
  };
};

export default createStore();
