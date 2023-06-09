import { useEffect, useState } from 'react';
import { deepEqual } from '@wagmi/core';

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (deepEqual(value, debouncedValue)) return;
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, debouncedValue]);

  return debouncedValue;
}

export default useDebounce;
