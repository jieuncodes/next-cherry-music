import { SetterOrUpdater } from "recoil";
import { useState, useEffect } from "react";

interface useSyncedLocalStorageProps<T> {
  key: string;
  initialValue: T;
  setRecoilState: SetterOrUpdater<T>;
}

function useSyncedLocalStorage<T>({
  key,
  initialValue,
  setRecoilState,
}: useSyncedLocalStorageProps<T>) {
  const getStoredValue = (): T => {
    try {
      const item =
        typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error parsing stored value for key "${key}":`, error);
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(getStoredValue());

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
        setRecoilState(value);
      }
    } catch (error) {
      console.error(`Error storing value for key "${key}":`, error);
    }
  }, [key, setRecoilState, value]);

  return { value, setValue };
}

export default useSyncedLocalStorage;
