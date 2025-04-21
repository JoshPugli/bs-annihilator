export const hide = (element: HTMLDivElement | null | undefined | Element) => {
  if (element) {
    (element as HTMLElement).style.display = "none";
  }
};
