import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Buttons } from './Buttons';

// Mock del hook useLanguage
jest.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({
    texts: {
      search_button: 'Buscar',
      user_location: 'Mi ubicación'
    },
    language: 'es',
    handleLanguage: jest.fn()
  })
}));

describe('Buttons Component Test', () => {
  const mockOnSearch = jest.fn();
  const mockOnLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza ambos botones correctamente', () => {
    render(<Buttons onSearch={mockOnSearch} onLocation={mockOnLocation} />);
    
    expect(screen.getByText('Buscar')).toBeInTheDocument();
    expect(screen.getByText('📍 Mi ubicación')).toBeInTheDocument();
  });

  test('el botón de búsqueda llama a onSearch al hacer click', () => {
    render(<Buttons onSearch={mockOnSearch} onLocation={mockOnLocation} />);
    
    fireEvent.click(screen.getByText('Buscar'));
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  test('el botón de ubicación llama a onLocation al hacer click', () => {
    render(<Buttons onSearch={mockOnSearch} onLocation={mockOnLocation} />);
    
    fireEvent.click(screen.getByText('📍 Mi ubicación'));
    expect(mockOnLocation).toHaveBeenCalledTimes(1);
  });
});