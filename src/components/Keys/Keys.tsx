import {ArrowKey} from '../../helpers/interfaces/ArrowKey';
import './Keys.css';

export const Keys = ({keys}: { keys: Array<ArrowKey> }) => {
  return (
    <div className="Keys">
      {keys.map((key, index) => (
        <div className="Key" key={index}>
          {key.keySymbol}
        </div>
      ))}
    </div>
  );
};
