import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from './renderWithRouter';

describe('Tests for page About', () => {
  it('Testing if the page has h2 with About Pokedex text', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Must have an img with src specific', () => {
    render(<About />);
    const SRC_IMAGE_POKEDEX = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const imagePokedex = screen.getByAltText('Pokédex');
    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex.src).toBe(SRC_IMAGE_POKEDEX);
  });
});
