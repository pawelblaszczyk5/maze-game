import { act, renderHook } from '@testing-library/react-hooks';
import { useCheat } from '@/hooks/useCheat';
import userEvent from '@testing-library/user-event';

const CHEAT_CODE = ['KeyC', 'KeyA'];

describe('useCheat hook tests', () => {
  test('should let user enter cheat code', () => {
    const { result } = renderHook(() => useCheat(CHEAT_CODE));

    expect(result.current).toEqual(false);
    act(() => {
      userEvent.keyboard('ca');
    });

    expect(result.current).toEqual(true);
  });

  test('entered letters should timeout after a while', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useCheat(CHEAT_CODE));

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
    const { result } = renderHook(() => useCheat(CHEAT_CODE));

    act(() => {
      userEvent.keyboard('cccccccccca');
    });

    expect(result.current).toEqual(true);
  });
});
