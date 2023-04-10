import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const favoritePokemon = 'Favorite Pokémon';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeElement = screen.getByRole('link', {
      name: 'Home',
    });
    const aboutElement = screen.getByRole('link', {
      name: 'About',
    });
    const favoriteElement = screen.getByRole('link', {
      name: favoritePokemon,
    });

    expect(homeElement).toBeInTheDocument();
    expect(homeElement).toHaveAttribute('href', '/');

    expect(aboutElement).toBeInTheDocument();
    expect(aboutElement).toHaveAttribute('href', '/about');

    expect(favoriteElement).toBeInTheDocument();
    expect(favoriteElement).toHaveAttribute('href', '/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', async () => {
    const { history } = renderWithRouter(<App />);

    const homeElement = screen.getByRole('link', {
      name: 'Home',
    });

    userEvent.click(homeElement);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    }, { timeout: 2000 });
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', async () => {
    const { history } = renderWithRouter(<App />);

    const aboutElement = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(aboutElement);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    }, { timeout: 2000 });
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/teste'));

    const pageNotFoundElement = screen.getByRole('heading', {
      name: 'Page requested not found',
    });
    expect(pageNotFoundElement).toBeInTheDocument();
  });
});
