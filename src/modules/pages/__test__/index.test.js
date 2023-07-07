import React from 'react';
import { useRouter } from 'next/router';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../../pages';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  test('renders Home component', () => {
    render(<Home />);
    const button = screen.getByText('GO TO GALLERY');
    expect(button).toBeInTheDocument();
  });

  test('navigates to gallery when button is clicked', () => {
    const pushMock = jest.fn();
    useRouter.mockImplementation(() => ({
      push: pushMock,
    }));

    render(<Home />);

    fireEvent.click(screen.getByText('GO TO GALLERY'));

    expect(pushMock).toHaveBeenCalledWith('/gallery');
  });
});
