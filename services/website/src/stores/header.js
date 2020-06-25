import { writable } from "svelte/store";

const createStore = () => {
  const { subscribe, update } = writable({
    header: {
      isTransparent: true,
    },
    scrollBarProgress: {
      isVisible: false,
      readingTime: {},
    },
  });

  return {
    subscribe,
    setHeaderTransparent: (value) =>
      update((store) => ({
        ...store,
        header: {
          isTransparent: value,
        },
      })),
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
