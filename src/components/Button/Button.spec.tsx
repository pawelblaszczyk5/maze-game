import { render, screen } from '@testing-library/react';
import { Button } from '@/components/Button/Button';
import React from 'react';
import userEvent from '@testing-library/user-event';

const setup = ({
  onClick = jest.fn(),
  children,
}: {
  onClick?: jest.Mock;
  children?: React.ReactNode;
} = {}) => {
  render(<Button onClick={onClick}>{children}</Button>);
};

describe('Button tests', () => {
  test('should render with default text', () => {
    setup();

    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  test('should render with passed element inside', () => {
    setup({ children: <span>test</span> });

    expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument();
  });

  test('should invoke passed callback on click', () => {
    const mockOnClickFunction = jest.fn();

    setup({ onClick: mockOnClickFunction });

    userEvent.click(screen.getByRole('button'));
    userEvent.click(screen.getByRole('button'));

    expect(mockOnClickFunction).toHaveBeenCalledTimes(2);
  });
});
