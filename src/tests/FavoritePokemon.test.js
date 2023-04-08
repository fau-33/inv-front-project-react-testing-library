import { screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../pages/FavoritePokemon';
import renderWithRouter from './renderWithRouter';

describe('Tests for page FavoritePokemons', () => {
  it('the message No favorite pokemon found is displayed on the screen', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
});
