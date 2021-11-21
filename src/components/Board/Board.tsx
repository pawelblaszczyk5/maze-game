import { Coordinates, Maze, MazeCell } from '@/model/maze';
import { container } from '@/components/Board/Board.css';
import { Cell } from '@/components/Cell';
import { useCallback, useEffect, useState } from 'react';
import { RelativeDirection } from '@/model/enums/relativeDirection';
import { PlayerMoves } from '@/components/PlayerMoves';
import { GameResult } from '@/model/gameResult';
import { useCheat } from '@/hooks/';
import { CHEAT_CODE } from '@/constants/cheatCode';

interface BoardProps {
  board: Maze;
  gameInProgress: boolean;
  onGameFinish: (result: GameResult) => void;
  solution: Array<MazeCell>;
}

export const Board = ({
  board,
  gameInProgress,
  onGameFinish,
  solution,
}: BoardProps) => {
  const [playerPosition, setPlayerPosition] = useState<Coordinates>({
    x: 0,
    y: 0,
  });
  const cheating = useCheat(CHEAT_CODE);

  useEffect(() => {
    setPlayerPosition({ x: 0, y: 0 });
  }, [board]);

  const movePlayer = (direction: RelativeDirection) => {
    switch (direction) {
      case RelativeDirection.DOWN:
        setPlayerPosition(({ x, y }) => ({ x, y: y + 1 }));
        break;
      case RelativeDirection.UP:
        setPlayerPosition(({ x, y }) => ({ x, y: y - 1 }));
        break;
      case RelativeDirection.LEFT:
        setPlayerPosition(({ x, y }) => ({ x: x - 1, y }));
        break;
      case RelativeDirection.RIGHT:
        setPlayerPosition(({ x, y }) => ({ x: x + 1, y }));
        break;
    }
  };

  const handleGameFinish = useCallback(
    (moves: number) => onGameFinish({ moves, perfectMoves: solution.length }),
    [onGameFinish, solution],
  );

  return (
    <>
      <div
        className={container}
        style={{ '--current-board-height': board.length }}
      >
        {board.map((row, currentY) =>
          row.map((cell, currentX) => (
            <Cell
              showSolution={cheating}
              solution={solution}
              cell={cell}
              playerVisiting={
                playerPosition.x === currentX && playerPosition.y === currentY
              }
              mazeEnd={
                cell.coordinates.x === board.length - 1 &&
                cell.coordinates.y === board.length - 1
              }
              key={`${currentY}_${currentX}`}
            />
          )),
        )}
      </div>
      {gameInProgress && (
        <PlayerMoves
          onPlayerMove={movePlayer}
          board={board}
          playerPosition={playerPosition}
          onGameFinish={handleGameFinish}
        />
      )}
    </>
  );
};
