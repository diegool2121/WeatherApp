import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CitySearch } from './CitySearch';
import { Suggestion } from '../models/suggestion';

// Mock del hook useLanguage
jest.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({
    texts: {
      search_placeholder: 'Buscar ciudad...',
    },
    language: 'es',
    handleLanguage: jest.fn(),
  }),
}));

describe('CitySearch Component', () => {
  const mockSetCity = jest.fn();
  const mockOnSelect = jest.fn();
  const mockSuggestions: Suggestion[] = [
    {
      name: 'Madrid',
      country: 'ES',
      state: 'Madrid',
      lat: 40.4165,
      lon: -3.70256,
    },
    {
      name: 'Barcelona',
      country: 'ES',
      state: 'Catalonia',
      lat: 41.3851,
      lon: 2.1734,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el input con el placeholder correcto', () => {
    render(
      <CitySearch
        city=""
        setCity={mockSetCity}
        suggestions={[]}
        onSelect={mockOnSelect}
      />
    );

    const input = screen.getByPlaceholderText('Buscar ciudad...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('muestra el valor actual de la ciudad', () => {
    render(
      <CitySearch
        city="Madrid"
        setCity={mockSetCity}
        suggestions={[]}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByDisplayValue('Madrid')).toBeInTheDocument();
  });

  test('llama a setCity cuando se escribe en el input', () => {
    render(
      <CitySearch
        city=""
        setCity={mockSetCity}
        suggestions={[]}
        onSelect={mockOnSelect}
      />
    );

    const input = screen.getByPlaceholderText('Buscar ciudad...');
    fireEvent.change(input, { target: { value: 'Barcelona' } });

    expect(mockSetCity).toHaveBeenCalledTimes(1);
    expect(mockSetCity).toHaveBeenCalledWith('Barcelona');
  });

  test('no muestra sugerencias cuando el array está vacío', () => {
    render(
      <CitySearch
        city="Mad"
        setCity={mockSetCity}
        suggestions={[]}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('muestra la lista de sugerencias cuando hay datos', () => {
    render(
      <CitySearch
        city="Mad"
        setCity={mockSetCity}
        suggestions={mockSuggestions}
        onSelect={mockOnSelect}
      />
    );

    const suggestionList = screen.getByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Madrid, Madrid, ES')).toBeInTheDocument();
    expect(screen.getByText('Barcelona, Catalonia, ES')).toBeInTheDocument();
  });

  test('llama a onSelect con los datos correctos al hacer click en una sugerencia', () => {
    render(
      <CitySearch
        city="Mad"
        setCity={mockSetCity}
        suggestions={mockSuggestions}
        onSelect={mockOnSelect}
      />
    );

    const firstSuggestion = screen.getByText('Madrid, Madrid, ES');
    fireEvent.click(firstSuggestion);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(
      40.4165,
      -3.70256,
      'Madrid',
      'ES'
    );
  });

  test('aplica las clases CSS correctamente', () => {
    render(
      <CitySearch
        city=""
        setCity={mockSetCity}
        suggestions={[]}
        onSelect={mockOnSelect}
      />
    );

    const input = screen.getByPlaceholderText('Buscar ciudad...');
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('px-4');
    expect(input).toHaveClass('py-2');
    expect(input).toHaveClass('rounded-lg');
    expect(input).toHaveClass('focus:ring-2');
    expect(input).toHaveClass('focus:ring-blue-400');
    expect(input).toHaveClass('text-black');
  });

  test('aplica estilos correctos a la lista de sugerencias', () => {
    render(
      <CitySearch
        city="Mad"
        setCity={mockSetCity}
        suggestions={mockSuggestions}
        onSelect={mockOnSelect}
      />
    );

    const suggestionList = screen.getByRole('list');
    expect(suggestionList).toHaveClass('absolute');
    expect(suggestionList).toHaveClass('z-10');
    expect(suggestionList).toHaveClass('bg-white');
    expect(suggestionList).toHaveClass('border');
    expect(suggestionList).toHaveClass('rounded-lg');
    expect(suggestionList).toHaveClass('shadow-md');
  });
});