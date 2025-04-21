export const hide = (element: HTMLDivElement | null | undefined | Element) => {
  if (element) {
    element.remove();
  }
};
