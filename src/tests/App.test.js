import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tests for component App.js', () => {
  it('contains a fixed set of navigation links', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });

  it('when clicking the Home link, redirect to URL /', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('when clicking the About link, redirect to URL /about', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('when clicking the Favorite Pokémons link, redirect to URL /favorites', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('redirected to Not Found page when entering unknown URL', () => {
    const { history } = renderWithRouter(<App />);
    const TEXT_NOT_FOUND = 'Page requested not found';

    act(() => {
      history.push('/notFoundUrl');
    });
    const notFoundHeading = screen.getByRole('heading', { name: TEXT_NOT_FOUND, level: 2 });
    const notFoundImage = screen.getByAltText('Pikachu crying because the page requested was not found');

    expect(notFoundHeading).toBeInTheDocument();
    expect(notFoundImage).toBeInTheDocument();
  });
});
