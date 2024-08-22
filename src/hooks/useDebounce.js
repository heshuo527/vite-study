import { useCallback, useRef, useEffect } from 'react';

/**
 * 防抖
 * @param {*} callback 防抖函数
 * @param {*} delay 防抖时间
 * @returns function
 */
export function useDebounce(callback, delay) {
  const timerRef = useRef(null);

  const debounceFunc = useCallback((...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return debounceFunc;
}