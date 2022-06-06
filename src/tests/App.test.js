import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('App component tests.', () => {
  it('Test if the links are rendered and with the correct texts.', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Test if when clicking on the home link the redirected path is "/".', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('Test if when clicking on the about link the redirected path is "/about".', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('When clicking on the favorites link the redirected path is "/favorites".', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('When accessing an unknown URL the page not found is rendered.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/unknown');

    const { location: { pathname } } = history;

    expect(pathname).toBe('/unknown');

    const titleNotFound = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });

    expect(titleNotFound).toBeInTheDocument();
  });
});
