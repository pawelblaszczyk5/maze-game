import { act, renderHook } from '@testing-library/react-hooks';
import { useWindowEventListener } from '@/hooks/';
import userEvent from '@testing-library/user-event';

interface HookRenderProps {
  eventName: keyof WindowEventMap;
  handler: () => void;
}

const setup = (initialProps: HookRenderProps) =>
  renderHook(
    ({ eventName, handler }: HookRenderProps) =>
      useWindowEventListener(eventName, handler),
    {
      initialProps,
    },
  );

describe('useWindowEventListener hook tests', () => {
  test('should add listener to window', () => {
    const handler = jest.fn();

    setup({ eventName: 'click', handler });

    act(() => {
      userEvent.click(document.body);
    });

    expect(handler).toHaveBeenCalled();
  });

  test('should remove event listener on component unmount', () => {
    const handler = jest.fn();
    const { unmount } = setup({ eventName: 'click', handler });

    unmount();
    act(() => {
      userEvent.click(document.body);
    });

    expect(handler).not.toHaveBeenCalled();
  });

  test('should remount handler only when event changed', () => {
    const firstHandler = jest.fn();
    const secondHandler = jest.fn();
    const { rerender } = setup({ eventName: 'click', handler: firstHandler });
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    rerender({ handler: secondHandler, eventName: 'click' });

    expect(removeEventListenerSpy).not.toHaveBeenCalledWith(
      'click',
      firstHandler,
    );

    rerender({ handler: jest.fn(), eventName: 'keyup' });

    expect(removeEventListenerSpy.mock.calls).toContainEqual(
      expect.arrayContaining(['click']),
    );
  });
});
