import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WeatherCard } from './WeatherCard';

// Mock del hook useLanguage
jest.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({
    texts: {
      weather_in: 'Clima en',
      temperature: 'Temperatura:',
      humidity: 'Humedad:',
      description: 'Descripción:'
    }
  })
}));

describe('WeatherCard Test', () => {
  const mockWeather = {
    name: 'Madrid',
    main: {
      temp: 22,
      humidity: 65
    },
    weather: [{
      description: 'cielo claro'
    }]
  };

  test('muestra la información básica del clima', () => {
    render(<WeatherCard weather={mockWeather} />);
    
    // Verifica que se muestre el nombre de la ciudad
    expect(screen.getByText((content, node) => {
      const hasText = (node: Element | null) => node?.textContent === 'Clima en Madrid';
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node?.children || []).every(
        child => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
    
    // Verifica la temperatura (usando una expresión más flexible)
    const tempElement = screen.getByText('Temperatura:');
    expect(tempElement).toBeInTheDocument();
    expect(tempElement.parentElement).toHaveTextContent('Temperatura: 22 °C');
    
    // Verifica la humedad
    const humidityElement = screen.getByText('Humedad:');
    expect(humidityElement).toBeInTheDocument();
    expect(humidityElement.parentElement).toHaveTextContent('Humedad: 65%');
    
    // Verifica la descripción
    const descElement = screen.getByText('Descripción:');
    expect(descElement).toBeInTheDocument();
    expect(descElement.parentElement).toHaveTextContent('Descripción: cielo claro');
  });

  test('tiene las clases CSS básicas', () => {
    const { container } = render(<WeatherCard weather={mockWeather} />);
    const card = container.firstChild;
    
    expect(card).toHaveClass('bg-blue-100');
    expect(card).toHaveClass('p-4');
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('shadow-inner');
  });
});