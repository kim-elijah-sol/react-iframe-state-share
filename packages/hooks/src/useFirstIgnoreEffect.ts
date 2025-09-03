import { useEffect, useRef } from 'react';

export function useFirstIgnoreEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
) {
  const isFirst = useRef<boolean>(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    effect();
  }, deps);
}
