import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('REQ03 testando o componente <FavoritePokemon.js />', () => {
  beforeEach(() => {
    renderWithRouter(<FavoritePokemon pokemonList={ [pokemonList[0]] } />);
  });

  test('Teste se é exibida na tela a mensagem "No favorite pokemon found", caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);
    const textEl = screen.getByText(/no favorite pokémon found/i);
    expect(textEl).toBeInTheDocument();
  });

  test('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    const pokemonFavorite = screen.getByText(/pikachu/i);
    expect(pokemonFavorite).toBeInTheDocument();
  });
});
