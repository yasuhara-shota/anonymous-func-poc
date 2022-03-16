import React, { memo, useCallback, useState } from "react";
import "./App.css";
import {
  VeryHeavyComponent,
  VeryHeavyComponentWithUseMemo,
  VeryHeavyComponentWithMemo,
} from "./VeryHeavyComponent";

/**
 * VeryHeavyComponent は、フィボナッチ数列を出力するコンポーネント
 * 計算結果について、以下のように最適化処理を施してある
 *
 * 何も最適化を施さない => Normal
 * 内部で計算結果を useMemo する => UseMemo
 * コンポーネントを memo する + 内部で計算結果を useMemo する => FullMemo
 *
 * VeryHeavyComponent* は、再レンダリング時に console.log へ name を出力する
 *
 * Normal では、クリックハンドラをどのような形で渡していても更新がある度に常にすべてのコンポーネントが再レンダリングされる
 * UseMemo でも、 Normal と同じ結果が得られる
 * FullMemo のみ、更新が必要ない他のコンポーネントの再レンダリングが行われない
 *
 * 結論: 匿名関数をコンポーネントに渡すかどうかはパフォーマンスには無関係で、
 * パフォーマンスを最適化するには useMemo や memo を適切に使うことのほうが重要
 *
 */

function App() {
  return (
    <div className="App">
      <h1>Normal</h1>
      <Normal />
      <h1>useMemo</h1>
      <UseMemo />
      <h1>useMemo + memo</h1>
      <FullMemo />
    </div>
  );
}

const Normal = memo(() => {
  const [len0, setLen0] = useState(0);
  const [len1, setLen1] = useState(0);
  const [len2, setLen2] = useState(0);

  const handler1 = () => setLen1((n) => n + 1);
  const handler2 = useCallback(() => setLen2((n) => n + 1), []);

  return (
    <div className="App">
      <VeryHeavyComponent
        name="test0"
        length={len0}
        onClick={() => setLen0((n) => n + 1)}
      />
      <VeryHeavyComponent name="test1" length={len1} onClick={handler1} />
      <VeryHeavyComponent name="test2" length={len2} onClick={handler2} />
      <div>sum: {len0 + len1 + len2}</div>
    </div>
  );
});

const UseMemo = () => {
  const [len0, setLen0] = useState(0);
  const [len1, setLen1] = useState(0);
  const [len2, setLen2] = useState(0);

  const handler1 = () => setLen1((n) => n + 1);
  const handler2 = useCallback(() => setLen2((n) => n + 1), []);

  return (
    <div className="App">
      <VeryHeavyComponentWithUseMemo
        name="test0"
        length={len0}
        onClick={() => setLen0((n) => n + 1)}
      />
      <VeryHeavyComponentWithUseMemo
        name="test1"
        length={len1}
        onClick={handler1}
      />
      <VeryHeavyComponentWithUseMemo
        name="test2"
        length={len2}
        onClick={handler2}
      />
      <div>sum: {len0 + len1 + len2}</div>
    </div>
  );
};

const FullMemo = memo(() => {
  const [len0, setLen0] = useState(0);
  const [len1, setLen1] = useState(0);
  const [len2, setLen2] = useState(0);

  const handler1 = () => setLen1((n) => n + 1);
  const handler2 = useCallback(() => setLen2((n) => n + 1), []);

  return (
    <div className="App">
      <VeryHeavyComponentWithMemo
        name="test0"
        length={len0}
        onClick={() => setLen0((n) => n + 1)}
      />
      <VeryHeavyComponentWithMemo
        name="test1"
        length={len1}
        onClick={handler1}
      />
      <VeryHeavyComponentWithMemo
        name="test2"
        length={len2}
        onClick={handler2}
      />
      <div>sum: {len0 + len1 + len2}</div>
    </div>
  );
});

export default App;
