import { render, screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';

const URL_IMG = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('About component tests.', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('Test if there is a title with the text "About the Pokédex" on the screen.', () => {
    const titleAbout = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(titleAbout).toBeInTheDocument();
  });

  it('Test if there are two paragraphs with texts about the pokédex.', () => {
    const firstParagraph = screen
      .getByText(/This application simulates a Pokédex, a digital encyclopedia/i);
    const secondParagraph = screen
      .getByText(/one can filter pokémons by type, and see more details for each one/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Test if the image contains the correct url.', () => {
    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', URL_IMG);
  });
});
