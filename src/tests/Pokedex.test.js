import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const MAX_BUTTONS = 7;

const POKEMON_TYPES = [
  'Electric', 'Fire', 'Bug', 'Poison',
  'Psychic', 'Normal', 'Dragon'];

const POKEMONS = [
  'Pikachu', 'Charmander',
  'Caterpie', 'Ekans',
  'Alakazam', 'Mew',
  'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];

describe('Pokedex component tests.', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />
      </MemoryRouter>,
    );
  });

  it('The page renders a title with the text "Encountered pokemons".', () => {
    const titleEl = screen.getByRole('heading', { name: 'Encountered pokémons' });

    expect(titleEl).toBeInTheDocument();
  });

  it('The next pokemon in the list is displayed when the button is clicked.', () => {
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    POKEMONS.forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });
  });

  it('Only one pokemon is displayed at a time.', () => {
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pikachu sprite/i })).toBeInTheDocument();
    expect(screen.getByText(/average weight: 6\.0 kg/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));

    expect(screen.queryByText(/pikachu/i)).toBeNull();
    expect(screen.queryByRole('img', { name: /pikachu sprite/i })).toBeNull();
    expect(screen.queryByText(/average weight: 6\.0 kg/i)).not.toBeInTheDocument();

    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /charmander sprite/i })).toBeInTheDocument();
    expect(screen.getByText(/average weight: 8\.5 kg/i)).toBeInTheDocument();
  });

  it('Test if the Pokédex has the filter buttons.', () => {
    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(MAX_BUTTONS);
    POKEMON_TYPES.forEach((type) => {
      expect(screen.getByRole('button', { name: `${type}` })).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();

    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /charmander sprite/i })).toBeInTheDocument();
    expect(screen.getByText(/average weight: 8\.5 kg/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();

    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /rapidash sprite/i })).toBeInTheDocument();
    expect(screen.getByText(/average weight: 95\.0 kg/i)).toBeInTheDocument();
  });

  it('Test if the Pokédex contains a button to reset the filter.', () => {
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /all/i }));

    POKEMONS.forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    });
  });
});
