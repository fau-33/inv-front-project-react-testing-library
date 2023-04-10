import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Pokemon from '../components/Pokemon';

describe('Teste do componente Pokemon', () => {
  const pokemon = {
    id: 1,
    name: 'Bulbasaur',
    type: 'Grass/Poison',
    averageWeight: {
      value: '6.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)',
  };

  const pikachu = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/025Pikachu.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  };

  test('Renderiza um card com as informações de determinado Pokémon', () => {
    render(
      <Router>
        <Pokemon pokemon={ pokemon } isFavorite={ false } />
      </Router>,
    );

    const pokemonName = screen.getByText(/bulbasaur/i);
    const pokemonType = screen.getByText(/grass\/poison/i);
    const pokemonWeight = screen.getByText(/average weight: 6.9 kg/i);
    const pokemonImage = screen.getByAltText(/bulbasaur sprite/i);
    const pokemonLink = screen.getByRole('link', { name: /more details/i });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png',
    );
    expect(pokemonImage).toHaveAttribute('alt', 'Bulbasaur sprite');
    expect(pokemonLink).toHaveAttribute('href', '/pokemon/1');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    render(
      <Router>
        <Pokemon pokemon={ pikachu } showDetailsLink isFavorite />
      </Router>,
    );

    const pokemonCardLink = screen.getByRole('link', {
      name: 'More details',
    });

    expect(pokemonCardLink.href).toContain('/pokemon/25');
  });

  test('Exibe um ícone de estrela nos Pokémon favoritados', () => {
    render(
      <Router>
        <Pokemon pokemon={ pokemon } isFavorite />
      </Router>,
    );

    const favoriteIcon = screen.getByAltText(/bulbasaur is marked as favorite/i);

    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
