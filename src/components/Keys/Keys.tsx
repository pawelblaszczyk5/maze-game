import {ArrowKey} from '../../helpers/interfaces/ArrowKey';

export const Keys = ({keys}: { keys: Array<ArrowKey> }) => {
  return (
    <div>
      {keys.map((key, index) => (
        <p key={index}>
          {key.keySymbol}
        </p>
      ))}
    </div>
  );
};
