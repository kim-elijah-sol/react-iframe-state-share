import { useCallback, useEffect, useState } from 'react';

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

  useEffect(() => {
    const iframe = document.querySelector('iframe')!;

    iframe.contentWindow?.postMessage(
      {
        type: 'COUNTER_CHANGE',
        data: {
          count,
        },
      },
      '*'
    );
  }, [count]);

  return [count, increase, decrease] as const;
}

export default useCounter;
