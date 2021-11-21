import { render, screen } from '@testing-library/react';
import { Game } from '@/components/Game/';
import { Difficulty } from '@/model/enums/difficulty';
import * as mazeHelpers from '@/helpers/maze/generate';
import { MOCK_MAZE, USER_EVENT_SOLUTION } from '@/test/mockMaze';
import userEvent from '@testing-library/user-event';

const setup = () => {
  render(<Game initialDifficulty={Difficulty.EASY} />);
};

describe('Game tests', () => {
  beforeAll(() => {
    jest
      .spyOn(mazeHelpers, 'generateMaze')
      .mockImplementation(() => [...MOCK_MAZE]);
  });

  test('should render board', () => {
    setup();

    expect(screen.getAllByTestId(/^cell_\d_\d$/)).toHaveLength(25);
  });

  test('should highlight current position', () => {
    setup();

    expect(screen.getByTestId('cell_0_0')).toHaveClass(
      'Cell_singleCellCurrentlyVisited__391hmr3',
    );
  });

  test('should show user input', () => {
    setup();

    userEvent.keyboard('{arrowdown}{arrowleft}');

    expect(screen.getByText('↓')).toBeInTheDocument();
    expect(screen.getByText('←')).toBeInTheDocument();
  });

  test('should highlight invalid moves', () => {
    setup();

    userEvent.keyboard('{arrowleft}');

    expect(screen.getByText('←')).toHaveClass(
      'PlayerMoves_arrowTileInvalid__u224711',
    );
  });

  test('should be possible to clear the board', async () => {
    setup();

    userEvent.keyboard(USER_EVENT_SOLUTION);

    expect(
      screen.getByRole('heading', {
        name: 'Congratulations, you rocking it! 🥳 You finished in 10 moves :)',
        level: 2,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: /^Easy|Normal|Hard$/ }),
    ).toHaveLength(3);
  });

  test('should count moves and show corresponding result', () => {
    setup();

    userEvent.keyboard('{arrowleft}{arrowleft}');
    userEvent.keyboard(USER_EVENT_SOLUTION);

    expect(
      screen.getByRole('heading', {
        name: 'Close to awesomeness! 👊 You finished in 12 moves :)',
        level: 2,
      }),
    ).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Normal' }));
    userEvent.keyboard('{arrowleft}{arrowleft}{arrowleft}');
    userEvent.keyboard(USER_EVENT_SOLUTION);

    expect(
      screen.getByRole('heading', {
        name: 'You could definitely do better 😞 You finished in 13 moves :)',
        level: 2,
      }),
    ).toBeInTheDocument();
  });

  test('should be possible to show solution', () => {
    setup();

    userEvent.keyboard('cheater');

    expect(screen.getByTestId('cell_0_0')).toHaveClass(
      'Cell_singleCellSolutionPart__391hmr1',
    );
  });
});
