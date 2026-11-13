import { StrictMode } from "react";
import { act, renderHook } from "@testing-library/react";
import usePremieres from "../hooks/usePremieres";

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });
const tick = (ms) => act(() => { vi.advanceTimersByTime(ms); });

it("recorre loading y ready devolviendo películas adaptadas", () => {
  const { result } = renderHook(() => usePremieres());
  expect(result.current).toMatchObject({ status: "loading", premieres: [], error: null });
  tick(899);
  expect(result.current.status).toBe("loading");
  tick(1);
  expect(result.current.status).toBe("ready");
  expect(result.current.premieres).toHaveLength(4);
  expect(result.current.premieres[0]).toMatchObject({ id: "101", title: "Horizonte azul", year: "2026" });
});

it("recorre error, reload, loading y recuperación", () => {
  const { result, rerender } = renderHook(({ failing }) => usePremieres({ failing }), { initialProps: { failing: true } });
  tick(900);
  expect(result.current.status).toBe("error");
  expect(result.current.premieres).toEqual([]);
  expect(result.current.error).toBeInstanceOf(Error);
  const reload = result.current.reload;
  act(() => result.current.reload());
  expect(result.current).toMatchObject({ status: "loading", error: null });
  rerender({ failing: false });
  tick(900);
  expect(result.current.status).toBe("ready");
  expect(result.current.reload).toBe(reload);
});

it("cancela la petición anterior al cambiar sus opciones", () => {
  const { result, rerender } = renderHook(({ failing }) => usePremieres({ failing }), { initialProps: { failing: false } });
  tick(800);
  rerender({ failing: true });
  tick(100);
  expect(result.current.status).toBe("loading");
  tick(800);
  expect(result.current.status).toBe("error");
});

it("limpia todos los temporizadores al desmontar incluso en StrictMode", () => {
  const { unmount } = renderHook(() => usePremieres(), { wrapper: StrictMode });
  expect(vi.getTimerCount()).toBe(1);
  unmount();
  expect(vi.getTimerCount()).toBe(0);
});
