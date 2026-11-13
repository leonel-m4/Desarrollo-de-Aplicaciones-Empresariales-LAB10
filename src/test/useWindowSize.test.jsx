import { act, renderHook } from "@testing-library/react";
import useWindowSize from "../hooks/useWindowSize";

it("lee el tamaño actual y responde al redimensionar", () => {
  const { result } = renderHook(() => useWindowSize());
  expect(result.current.width).toBe(window.innerWidth);
  act(() => {
    Object.defineProperty(window, "innerWidth", { value: 390, writable: true, configurable: true });
    Object.defineProperty(window, "innerHeight", { value: 844, writable: true, configurable: true });
    window.dispatchEvent(new Event("resize"));
  });
  expect(result.current).toEqual({ width: 390, height: 844 });
});

it("elimina exactamente el listener registrado al desmontar", () => {
  const add = vi.spyOn(window, "addEventListener");
  const remove = vi.spyOn(window, "removeEventListener");
  const { unmount } = renderHook(() => useWindowSize());
  const listener = add.mock.calls.find(([event]) => event === "resize")[1];
  unmount();
  expect(remove).toHaveBeenCalledWith("resize", listener);
  add.mockRestore();
  remove.mockRestore();
});
