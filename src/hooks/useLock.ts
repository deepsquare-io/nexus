import { useContext } from 'react';
import { lockContext } from '@lib/contexts/LockContext';

export default function useLock(key: string) {
  const { map, setterFactory } = useContext(lockContext);
  const isLocked = map[key] ?? false;
  const setter = setterFactory(key);

  return {
    isLocked,
    toggle: () => setter(!isLocked),
    lock: () => setter(true),
    unlock: () => setter(false),
  };
}
