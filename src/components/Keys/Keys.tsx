import {ArrowKey} from '../../helpers/interfaces/ArrowKey';
import './Keys.css';

export const Keys = ({keys}: { keys: Array<ArrowKey> }) => {
  return (
    <div className="Keys">
      {keys.map((key) => (
        <div className="Key" key={key.step} style={{color: key.isValid ? undefined : 'red'}}>
          {key.keySymbol}
        </div>
      ))}
    </div>
  );
};
