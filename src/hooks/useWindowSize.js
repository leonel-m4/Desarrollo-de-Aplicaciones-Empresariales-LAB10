import { useEffect, useState } from "react";

function readSize() {
  return {
    width: typeof window === "undefined" ? 1024 : window.innerWidth,
    height: typeof window === "undefined" ? 768 : window.innerHeight,
  };
}

export default function useWindowSize() {
  const [size, setSize] = useState(readSize);
  useEffect(() => {
    const handleResize = () => setSize(readSize());
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}
