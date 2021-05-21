import React from "react";
import { Flash, Label } from "@primer/components";
import { Board, Card, newBoard, toCards, toColor, version } from "./model";

export const App: React.FC = () => {
  const [board, setBoard] = React.useState<Board>();
  React.useEffect(() => void newBoard().then(setBoard), []);
  return (
    <main>
      <h1>連想</h1>
      <section>
        <button onClick={() => newBoard().then(setBoard)}>新規ゲーム</button>
      </section>
      {board && <BoardView board={board} />}
    </main>
  );
};

const BoardView: React.FC<{ board: Board }> = ({ board }) => {
  const cards = toCards(board);
  return (
    <section>
      {version !== board.version && (
        <Flash variant="danger">エラー：ゲームデータのバージョンが不一致</Flash>
      )}
      <p>
        中立カード: {cards.filter((e) => e.team === 0 && !e.isBanned).length}
      </p>
      {cards.map((card) => (
        <CardLabel key={card.word} card={card} />
      ))}
    </section>
  );
};

const CardLabel: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <Label
      style={{ background: toColor(card) }}
      variant="xl"
      m={20}
      outline
      onClick={() => console.log(card)}
    >
      {card.word}
    </Label>
  );
};
