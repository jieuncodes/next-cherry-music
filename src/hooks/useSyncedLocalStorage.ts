"use client";

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

  const setValue = (update: T | ((prevState: T) => T)) => {
    let newValue: T;

    if (typeof update === "function") {
      newValue = (update as (prevState: T) => T)(getStoredValue());
    } else {
      newValue = update;
    }

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setRecoilState(newValue);
      }
    } catch (error) {
      console.error(`Error storing value for key "${key}":`, error);
    }
  };

  useEffect(() => {
    setRecoilState(getStoredValue());
  }, [key, setRecoilState]);

  return { setValue };
}

export default useSyncedLocalStorage;
