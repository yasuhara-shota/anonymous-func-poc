import { memo, useMemo } from "react";

type Props = {
  name: string;
  length: number;
  onClick: () => void;
};

export const VeryHeavyComponent = ({ name, length, onClick }: Props) => {
  const items = new Array(length).fill(0).map((_, i) => calcFibonacci(i));
  console.log(name);
  return (
    <div>
      <button onClick={onClick}>count up</button>
      len: {length}
      <div>
        {items.map((n, index) => (
          <code key={`${name}-${index}`}>{n} </code>
        ))}
      </div>
    </div>
  );
};

export const VeryHeavyComponentWithUseMemo = ({
  name,
  length,
  onClick,
}: Props) => {
  const items = useMemo(
    () => new Array(length).fill(0).map((_, i) => calcFibonacci(i)),
    [length]
  );
  console.log(name);
  return (
    <div>
      <button onClick={onClick}>count up</button>
      len: {length}
      <div>
        {items.map((n, index) => (
          <code key={`${name}-${index}`}>{n} </code>
        ))}
      </div>
    </div>
  );
};

export const VeryHeavyComponentWithMemo = memo(
  VeryHeavyComponent,
  (prev, props) => prev.length === props.length
);

function calcFibonacci(n: number): number {
  return n <= 0 || n === 1 ? 1 : calcFibonacci(n - 1) + calcFibonacci(n - 2);
}
