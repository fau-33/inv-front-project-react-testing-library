import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../pages/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Tests for page NotFound', () => {
  it('contains an h2 heading with the text Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const TEXT_NOT_FOUND = /Page requested not found/i;

    const notFound = screen.getByRole('heading', { name: TEXT_NOT_FOUND,
      level: 2 });
    expect(notFound).toBeInTheDocument();
  });

  it('contains an img with src specific', () => {
    renderWithRouter(<NotFound />);
    const ALT_IMAGE_NOT_FOUND = 'Pikachu crying because the page requested was not found';
    const SRC_IMAGE_NOT_FOUND = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const imageNotFound = screen.getByAltText(ALT_IMAGE_NOT_FOUND);
    expect(imageNotFound).toBeInTheDocument();
    expect(imageNotFound.src).toBe(SRC_IMAGE_NOT_FOUND);
  });
});
