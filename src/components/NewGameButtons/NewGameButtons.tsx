import {GameDifficulty} from '../../helpers/enums/gameDifficulty';
import {Button} from '../Button/Button';
import './NewGameButtons.css';

export const NewGameButtons = ({
                                 newGameFunction,
                                 difficulties
                               }: { newGameFunction: (...args: Array<any>) => void, difficulties: Array<GameDifficulty> }) => {
    const difficultiesNames: Array<string> = ['Easy', 'Medium', 'Hard'];

    return (
      <div className="NewGameButtons">
        <p className="NewGameButtons__text">Start new game</p>
        {difficulties.map((element, index) => {
          return (
            <Button key={difficulties[index]} buttonText={difficultiesNames[index]} buttonHandler={newGameFunction}
                    buttonHandlerArgs={[difficulties[index]]}/>
          );
        })}
      </div>
    );
  }
;
