import { useCallback, useEffect, useState } from 'react';
import { useFirstIgnoreEffect } from '@riss/hooks';

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

  useFirstIgnoreEffect(() => {
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

  return [count, increase, decrease] as const;
}

export default useCounter;
