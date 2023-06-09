import { useContext } from 'react';
import { DialogContext } from '@lib/contexts/DialogContext';

export default function useDialog(key: string) {
  const { map, setterFactory } = useContext(DialogContext);
  const isOpen = map[key] ?? false;
  const setter = setterFactory(key);

  return {
    isOpen,
    toggle: () => setter(!isOpen),
    open: () => setter(true),
    close: () => setter(false),
  };
}
