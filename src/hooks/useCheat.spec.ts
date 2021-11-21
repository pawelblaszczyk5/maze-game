import { act, renderHook } from '@testing-library/react-hooks';
import { useCheat } from '@/hooks/';
import userEvent from '@testing-library/user-event';

const BASE_CHEAT_CODE = ['KeyC', 'KeyA'];
const SECOND_CHEAT_CODE = ['KeyC', 'KeyB'];

const setup = (cheatCode = BASE_CHEAT_CODE) =>
  renderHook((cheatCode: Array<string>) => useCheat(cheatCode), {
    initialProps: cheatCode,
  });

describe('useCheat hook tests', () => {
  test('should let user enter cheat code', () => {
    const { result } = setup();

    expect(result.current).toEqual(false);
    act(() => {
      userEvent.keyboard('ca');
    });

    expect(result.current).toEqual(true);
  });

  test('entered letters should timeout after a while', () => {
    jest.useFakeTimers();
    const { result } = setup();

    act(() => {
      userEvent.keyboard('c');
    });
    jest.runAllTimers();
    act(() => {
      userEvent.keyboard('a');
    });

    expect(result.current).toEqual(false);
    jest.useRealTimers();
  });

  test('should work with multiple enters of first letter', () => {
    const { result } = setup();

    act(() => {
      userEvent.keyboard('cccccccccca');
    });

    expect(result.current).toEqual(true);
  });

  test('should work with dynamically changed codes', () => {
    const { result, rerender } = setup();

    rerender(SECOND_CHEAT_CODE);
    act(() => {
      userEvent.keyboard('cb');
    });

    expect(result.current).toEqual(true);
  });

  test('dynamically changing code should reset current status', () => {
    const { result, rerender } = setup();

    act(() => {
      userEvent.keyboard('c');
    });
    rerender(SECOND_CHEAT_CODE);
    act(() => {
      userEvent.keyboard('b');
    });

    expect(result.current).toEqual(false);
  });
});
