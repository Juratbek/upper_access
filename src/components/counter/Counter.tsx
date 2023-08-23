import { Button } from 'components/lib';
import { FC, useCallback, useState } from 'react';

export const Counter: FC = () => {
  const [count, setCount] = useState(0);

  const countHandler = useCallback((value: number) => () => setCount((prev) => prev + value), []);

  return (
    <div>
      <p data-testid='count'>{count}</p>
      <Button onClick={countHandler(1)}>Increment</Button>
      <Button onClick={countHandler(-1)}>Decrement</Button>
    </div>
  );
};
