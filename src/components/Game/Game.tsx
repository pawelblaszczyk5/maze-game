import {ReactNode, useEffect, useState} from 'react';
import {CellCoordinates, findShortestPath, generateMaze, Maze, MazeCell} from '../../helpers/maze/maze';
import {Board} from '../Board/Board';
import {Keys} from '../Keys/Keys';
import useEventListener from '@use-it/event-listener';
import {ArrowKey} from '../../helpers/interfaces/ArrowKey';
import './Game.css';
import {ARROW_SYMBOLS, arrowKeys} from '../../helpers/arrowKeys/arrowKeys';
import {GameDifficulty} from '../../helpers/enums/gameDifficulty';
import {NewGameButtons} from '../NewGameButtons/NewGameButtons';
import {Modal} from '../Modal/Modal';
import {GameResult} from '../GameResult/GameResult';
import {useCheat} from '../../hooks/useCheat/';

const getRandomCell = (width: number, height: number): CellCoordinates => ({
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height),
});

export const Game = () => {
  const initialPlayerPosition: CellCoordinates = {x: 0, y: 0};

  const [maze, setMaze] = useState<Maze>();
  const [isGameRunning, setIsGameRunning] = useState<boolean>(true);
  const [width, setWidth] = useState<number>(15);
  const [height, setHeight] = useState<number>(15);
  const [playerPosition, setPlayerPosition] = useState<CellCoordinates>(initialPlayerPosition);
  const [keys, setKeys] = useState<Array<ArrowKey>>([]);
  const [newGame, setNewGame] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [titleScreenVisible, setTitleScreenVisible] = useState<boolean>(true);
  const [shortestPath, setShortestPath] = useState<Array<MazeCell>>([]);
  const [cheating, setCheating] = useState<boolean>(false);

  const startNewGame = (gameDifficulty: GameDifficulty) => {
    if (titleScreenVisible) {
      setTitleScreenVisible(false);
    }
    switch (gameDifficulty) {
      case GameDifficulty.EASY: {
        setWidth(15);
        setHeight(15);
        break;
      }
      case GameDifficulty.MEDIUM: {
        setWidth(20);
        setHeight(20);
        break;
      }
      case GameDifficulty.HARD: {
        setWidth(25);
        setHeight(25);
        break;
      }
    }
    setShowModal(false);
    setNewGame(true);
    setPlayerPosition(initialPlayerPosition);
    setKeys([]);
    setIsGameRunning(true);
  };

  const keyDownHandler = ({key}: { key: string }) => {
    if (maze && isGameRunning) {
      if (arrowKeys.includes(key)) {
        handlePlayerPositionChange(key);
      }
    }
  };

  const handlePlayerPositionChange = (key: string): void => {
    if (maze) {
      const newPlayerPosition = {...playerPosition};
      switch (key) {
        case arrowKeys[0]: {
          if (!maze[playerPosition.y][playerPosition.x].bottomWall) {
            newPlayerPosition.y += 1;
          }
          break;
        }
        case arrowKeys[1]: {
          if (!maze[playerPosition.y][playerPosition.x].topWall) {
            newPlayerPosition.y -= 1;
          }
          break;
        }
        case arrowKeys[2]: {
          if (!maze[playerPosition.y][playerPosition.x].leftWall) {
            newPlayerPosition.x -= 1;
          }
          break;
        }
        case arrowKeys[3]: {
          if (!maze[playerPosition.y][playerPosition.x].rightWall) {
            newPlayerPosition.x += 1;
          }
          break;
        }
      }
      let newKey: ArrowKey;
      if (playerPosition.x === newPlayerPosition.x && playerPosition.y === newPlayerPosition.y) {
        newKey = {keySymbol: ARROW_SYMBOLS[key], isValid: false, step: keys.length};
      } else {
        newKey = {keySymbol: ARROW_SYMBOLS[key], isValid: true, step: keys.length};
        setPlayerPosition(newPlayerPosition);
      }
      const newKeysArray = [...keys];
      newKeysArray.push(newKey);
      setKeys(newKeysArray);
    }
  };

  const newGameButtons: ReactNode = <NewGameButtons newGameFunction={startNewGame}
                                                    difficulties={[GameDifficulty.EASY, GameDifficulty.MEDIUM, GameDifficulty.HARD]}/>;

  useEventListener('keydown', keyDownHandler);

  useEffect(() => {
    if (newGame) {
      setMaze(generateMaze(width, height, getRandomCell(width, height)));
      setNewGame(false);
    }
  }, [newGame, width, height]);

  useEffect(() => {
    if (maze) {
      const newShortestPath = findShortestPath(maze);
      setShortestPath(newShortestPath ?? []);
    }
  }, [maze]);

  useEffect(() => {
    if (playerPosition.x === width - 1 && playerPosition.y === height - 1) {
      setIsGameRunning(false);
      setShowModal(true);
    }
  }, [width, height, playerPosition]);

  useCheat('iamcheater', () => {
    setCheating(!cheating);
  });

  return (
    <div className="Game">
      {titleScreenVisible &&
      <div className="TitleScreen">
        <h1>Maze Game</h1>
        <p>
          The goal of this game is to solve the maze with the fewest moves.
          Use arrows to move through the labyrinth and find the quickest path.
          There are 3 difficulties for you to choose.
          Good luck!
        </p>
        {newGameButtons}
      </div>
      }
      {maze && <Board maze={maze} player={playerPosition} shortestPath={cheating ? shortestPath : []}/>}
      {maze && <Keys keys={keys.slice(-5)}/>}
      {showModal && <Modal>
        <>
          <GameResult moves={keys.filter(key => key.isValid).length} bestMoves={shortestPath.length - 1}/>
          {newGameButtons}
        </>
      </Modal>}
    </div>
  );
};
