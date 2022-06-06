import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../pages/NotFound';

const URL_IMG = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('NotFound component tests.', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('The title with text "Page request not found" is displayed on screen.', () => {
    const titleNotFound = screen
      .getByRole('heading', { name: /page requested not found/i, level: 2 });

    expect(titleNotFound).toBeInTheDocument();
  });

  it('Test if the image contains the correct url.', () => {
    const img = screen
      .getByRole('img', { name: /pikachu crying because the page requested was not/i });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', URL_IMG);
  });
});
