import './Button.css';

export const Button = ({
                         buttonText,
                         buttonHandler,
                         buttonHandlerArgs
                       }: { buttonText: string, buttonHandler: (...args: Array<any>) => void, buttonHandlerArgs: Array<any> }) => {
  return (
    <button type="button" className="Button" onClick={() => {
      buttonHandler(...buttonHandlerArgs);
    }}>
      {buttonText}
    </button>
  );
};
