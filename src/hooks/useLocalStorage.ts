import { SetterOrUpdater } from "recoil";
import { useState, useEffect } from "react";

interface useLocalStorageProps<T> {
  key: string;
  initialValue: T;
  setRecoilState: SetterOrUpdater<T>;
}

function useLocalStorage<T>({
  key,
  initialValue,
  setRecoilState,
}: useLocalStorageProps<T>) {
  const storedValue =
    typeof window !== "undefined" ? window.localStorage.getItem(key) : null;

  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
      setRecoilState(value);
    }
  }, [value, key, setRecoilState]);

  return [value, setValue] as const;
}

export default useLocalStorage;
