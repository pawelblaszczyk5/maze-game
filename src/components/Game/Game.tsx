import {useEffect, useState} from 'react';
import {CellCoordinates, generateMaze, Maze} from '../../helpers/maze/maze';
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

  const startNewGame = (gameDifficulty: GameDifficulty) => {
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

  useEventListener('keydown', keyDownHandler);

  useEffect(() => {
    if (newGame) {
      setMaze(generateMaze(width, height, getRandomCell(width, height)));
    }
  }, [newGame, width, height]);

  useEffect(() => {
    if (playerPosition.x === width - 1 && playerPosition.y === height - 1) {
      setIsGameRunning(false);
      setShowModal(true);
    }
  }, [width, height, playerPosition]);

  return (
    <div className="Game">
      {maze && <Board maze={maze} player={playerPosition}/>}
      <Keys keys={keys.slice(-5)}/>
      {showModal && <Modal>
        <>
          <GameResult moves={keys.filter(key => key.isValid).length} bestMoves={100}/>
          <NewGameButtons newGameFunction={startNewGame}
                          difficulties={[GameDifficulty.EASY, GameDifficulty.MEDIUM, GameDifficulty.HARD]}/>
        </>
      </Modal>}
    </div>
  );
};
