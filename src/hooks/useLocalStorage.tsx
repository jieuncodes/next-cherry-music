import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue =
    typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initial);

  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
