import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('REQ05 testando o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ false }
    />);
    const titleEl = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(titleEl).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado', () => {
    renderWithRouter(<App />);
    const btnEl = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnEl).toBeInTheDocument();

    pokemonList.forEach((pokemon) => {
      const currPokemon = screen.getByRole('img', { name: `${pokemon.name} sprite` });
      expect(currPokemon.src).toBe(pokemon.image);
      userEvent.click(btnEl);
    });

    const firstPokemon = screen.getByRole('img');
    expect(firstPokemon.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    let pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toEqual(1);
    const btnEl = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnEl);
    pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toEqual(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const filters = [
      'All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    renderWithRouter(<App />);
    filters.forEach((filter) => {
      const button = screen.getByRole('button', { name: filter });
      expect(button).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireBtn);
    const firePokemonOne = screen.getByRole('img', { name: /charmander sprite/i });
    expect(firePokemonOne).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const firePokemonTwo = screen.getByRole('img', { name: /rapidash sprite/i });
    expect(firePokemonTwo).toBeInTheDocument();
    userEvent.click(allBtn);
    const pikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();
    const filtersTypes = screen.getAllByTestId('pokemon-type-button');
    expect(filtersTypes.length).toBe(7);
  });
});
