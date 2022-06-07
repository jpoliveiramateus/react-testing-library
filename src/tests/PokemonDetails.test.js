import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const URL_IMG = 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif';
const URL_IMG2 = 'https://pwo-wiki.info/images/5/5b/Pp.gif';

describe('PokemonDetails component tests', () => {
  it('The detailed information for the selected pokemon is shown on the screen.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    expect(history.location.pathname).toBe('/pokemons/25');

    expect(screen
      .getByRole('heading', { name: 'Pikachu Details', level: 2 })).toBeDefined();
    expect(screen.queryByRole('link', { name: /More details/i })).toBeNull();
    expect(screen
      .getByRole('heading', { name: 'Summary', level: 2 })).toBeDefined();
    expect(screen
      .getByText(/this intelligent pokémon roasts hard berries with electricity/i))
      .toBeInTheDocument();
  });

  it('Section with maps containing pokémon locations', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'More details' }));

    expect(history.location.pathname).toBe('/pokemons/25');

    expect(screen.getByRole('heading', { name: /game locations of pikachu/i }))
      .toBeDefined();

    expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();
    expect(screen.getByText(/kanto power plant/i)).toBeInTheDocument();

    expect(screen.getAllByRole('img', { name: /pikachu location/i })).toHaveLength(2);

    expect(screen.getAllByRole('img', { name: 'Pikachu location' })[0])
      .toHaveAttribute('src', URL_IMG);
    expect(screen.getAllByRole('img', { name: 'Pikachu location' })[1])
      .toHaveAttribute('src', URL_IMG2);
  });

  it('Test if the user can favorite a pokemon through the details page.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    expect(screen.getByText(/pokémon favoritado\?/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/pokémon favoritado\?/i));
    expect(screen.getByRole('img', { name: /pikachu is marked as favorite/i }))
      .toBeInTheDocument();

    userEvent.click(screen.getByText(/pokémon favoritado\?/i));
    expect(screen.queryByRole('img', { name: /pikachu is marked as favorite/i }))
      .not.toBeInTheDocument();
  });
});
