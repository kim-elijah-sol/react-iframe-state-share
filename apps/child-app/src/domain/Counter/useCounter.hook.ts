import { useCallback, useState } from 'react';

function useCounter() {
  const [count, setCount] = useState<number>(0);

  const increase = useCallback(
    (diff: number = 1) => setCount((count) => count + diff),
    []
  );

  const decrease = useCallback(
    (diff: number = 1) => setCount((count) => count - diff),
    []
  );

  return [count, increase, decrease] as const;
}

export default useCounter;
