import useCounter from './useCounter.hook';

function Counter() {
  const [count, increase, decrease] = useCounter();

  return (
    <div>
      <p>{count}</p>

      <button onClick={() => decrease()}>DECREASE</button>

      <button onClick={() => increase()}>INCREASE</button>
    </div>
  );
}

export default Counter;
