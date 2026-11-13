import { useCallback, useEffect, useState } from "react";
import { rawPremieres } from "../data/movies";
import { adaptMovie } from "../lib/movieAdapter";

export default function usePremieres({ failing = false, delay = 900 } = {}) {
  const [state, setState] = useState({ status: "loading", premieres: [], error: null });
  const [attempt, setAttempt] = useState(0);
  const reload = useCallback(() => setAttempt((value) => value + 1), []);
  useEffect(() => {
    setState({ status: "loading", premieres: [], error: null });
    const timer = setTimeout(() => {
      if (failing) {
        setState({ status: "error", premieres: [], error: new Error("No pudimos cargar los estrenos. Inténtalo de nuevo.") });
      } else {
        setState({ status: "ready", premieres: rawPremieres.map(adaptMovie), error: null });
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [failing, delay, attempt]);
  return { ...state, reload };
}
