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
    const eventHandler: (event: MessageEvent) => void = (event) => {
      if (event.origin !== 'https://riss-parent.run.goorm.site') return;

      const data = event.data as { type: string; data: { count: number } };

      if (data.type === 'COUNTER_CHANGE') {
        setCount(data.data.count);
      }
    };

    window.addEventListener('message', eventHandler);

    return () => {
      window.removeEventListener('message', eventHandler);
    };
  }, []);

  useEffect(() => {
    window.parent.postMessage(
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
