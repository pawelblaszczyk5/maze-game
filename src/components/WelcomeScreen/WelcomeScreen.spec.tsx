import { WelcomeScreen } from '@/components/WelcomeScreen/';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Difficulty } from '@/model/enums/difficulty';

const setup = (onGameStart: () => void = jest.fn()) => {
  render(<WelcomeScreen onGameStart={onGameStart} />);
};

describe('WelcomeScreen tests', () => {
  test('should render properly', () => {
    setup();

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/^The goal of/)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  test('should emit proper game difficulty after clicking corresponding button', () => {
    const mockOnGameStart = jest.fn();

    setup(mockOnGameStart);

    userEvent.click(screen.getByRole('button', { name: 'Easy' }));
    expect(mockOnGameStart).toHaveBeenLastCalledWith(Difficulty.EASY);

    userEvent.click(screen.getByRole('button', { name: 'Normal' }));
    expect(mockOnGameStart).toHaveBeenLastCalledWith(Difficulty.NORMAL);

    userEvent.click(screen.getByRole('button', { name: 'Hard' }));
    expect(mockOnGameStart).toHaveBeenLastCalledWith(Difficulty.HARD);
  });
});
