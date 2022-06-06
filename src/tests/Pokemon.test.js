import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const PIKACHU = pokemons[0];
const POKEMON_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
const PIKACHU_ID = pokemons[0].id;

describe('Pokemon component tests.', () => {
  it('Test if a card with the information of a certain pokémon is rendered.', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ PIKACHU } />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/Electric/i)).toBeInTheDocument();
    expect(screen.getByText(/average weight: 6\.0 kg/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pikachu sprite/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pikachu sprite/i }))
      .toHaveAttribute('src', POKEMON_URL);
  });

  it('The letter has a link that redirects to the url with the pokemon\'s id.', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ PIKACHU } />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${PIKACHU_ID}`);
  });

  it('Clicking on the details link is redirected to the pokemon details page.', () => {
    const { history } = renderWithRouter(<Pokemon isFavorite pokemon={ PIKACHU } />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(history.location.pathname).toBe(`/pokemons/${PIKACHU_ID}`);
  });

  it('Test if there is a star icon in favorite pokemons.', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ PIKACHU } />);
    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });

  it('Test if there is no star icon in unfavorite pokemons.', () => {
    renderWithRouter(<Pokemon isFavorite={ false } pokemon={ PIKACHU } />);
    const starIcon = screen
      .queryByRole('img', { name: /pikachu is marked as favorite/i });

    expect(starIcon).toBeNull();
  });
});
