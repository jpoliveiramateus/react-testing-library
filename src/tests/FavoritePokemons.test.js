import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

const MAX_IMAGES = 4;

describe('FavoritePokemons component tests.', () => {
  beforeEach(() => {
    render(<FavoritePokemons />);
  });

  it('The title "Favorite Pokémon" is displayed on the screen.', () => {
    const titleFavorite = screen
      .getByRole('heading', { name: 'Favorite pokémons', level: 2 });

    expect(titleFavorite).toBeInTheDocument();
  });

  it('"No favorite pokemon found" is rendered, when no favorite pokemon exists.', () => {
    const noFavoriteEl = screen.getByText(/No favorite pokemon found/i);

    expect(noFavoriteEl).toBeInTheDocument();
  });
});

describe('FavoritePokemons component tests 2.', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  it('Test if all favorite Pokemon cards are displayed.', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favoritePokemon = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoritePokemon);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemon);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByText(/pokémon favoritado\?/i));

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const pikachuEl = screen.getByRole('img', { name: /pikachu sprite/i });
    const charmanderEl = screen.getByRole('img', { name: /charmander sprite/i });

    expect(pikachuEl).toBeInTheDocument();
    expect(charmanderEl).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(MAX_IMAGES);
  });
});
