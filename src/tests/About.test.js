import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';
import renderWithRouter from './renderWithRouter';

describe('Tests for page About.js', () => {
  it('must have an h2 header with text About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByRole('heading', { name: /About Pokédex/i,
      level: 2 });
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('must have an img with src specific', () => {
    render(<About />);
    const SRC_IMAGE_POKEDEX = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const imagePokedex = screen.getByAltText('Pokédex');
    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex.src).toBe(SRC_IMAGE_POKEDEX);
  });
});
