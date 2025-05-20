import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';

// Mock completo de useWeather
jest.mock('../hooks/useWeather', () => ({
  useWeather: jest.fn(() => ({
    city: '',
    setCity: jest.fn(),
    suggestions: [],
    weather: null,
    error: null,
    searchWeather: jest.fn(),
    getLocationWeather: jest.fn()
  }))
}));

// Mock de LanguageContext
jest.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({
    lang: 'es',
    texts: {
      app_name: 'Clima App',
      weather_in: 'Clima en',
      temperature: 'Temperatura',
      humidity: 'Humedad',
      description: 'Descripción',
      search_button: 'Buscar',
      user_location: 'Mi ubicación',
      search_placeholder: 'Buscar ciudad...'
    },
    setLang: jest.fn()
  })
}));

// Mock simplificado de CitySearch
jest.mock('../components/CitySearch', () => ({
  CitySearch: () => <div data-testid="city-search">CitySearch Mock</div>
}));

// Mock simplificado de WeatherCard
jest.mock('../components/WeatherCard', () => ({
  WeatherCard: () => <div data-testid="weather-card">WeatherCard Mock</div>
}));

// Mock simplificado de Buttons
jest.mock('../components/Buttons', () => ({
  Buttons: () => <div data-testid="buttons">Buttons Mock</div>
}));

// Mock de LanguageSwitcher
jest.mock('../components/Language', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">LanguageSwitcher Mock</div>
}));

describe('Home Page', () => {
  const mockUseWeather = require('../hooks/useWeather').useWeather;

  beforeEach(() => {
    // Resetear mocks antes de cada test
    mockUseWeather.mockImplementation(() => ({
      city: '',
      setCity: jest.fn(),
      suggestions: [],
      weather: null,
      error: null,
      searchWeather: jest.fn(),
      getLocationWeather: jest.fn()
    }));
  });

  test('renderiza correctamente sin datos del clima', () => {
    render(<Home />);
    
    expect(screen.getByText('☁️ Clima App')).toBeInTheDocument();
    expect(screen.getByTestId('city-search')).toBeInTheDocument();
    expect(screen.getByTestId('buttons')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    expect(screen.queryByTestId('weather-card')).not.toBeInTheDocument();
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  test('renderiza WeatherCard cuando hay datos del clima', () => {
    mockUseWeather.mockImplementation(() => ({
      weather: {
        name: 'Madrid',
        main: { temp: 22, humidity: 65 },
        weather: [{ description: 'cielo claro' }]
      },
      // ...otros valores por defecto
    }));

    render(<Home />);
    expect(screen.getByTestId('weather-card')).toBeInTheDocument();
  });

  test('muestra errores cuando hay un error', () => {
    mockUseWeather.mockImplementation(() => ({
      error: 'Ciudad no encontrada',
      // ...otros valores por defecto
    }));

    render(<Home />);
    expect(screen.getByText('Ciudad no encontrada')).toBeInTheDocument();
  });

  test('aplica clases de gradiente correctamente', () => {
    mockUseWeather.mockImplementation(() => ({
      weather: {
        name: 'Madrid',
        main: { temp: 30 }, // Temperatura cálida
        weather: [{ description: 'soleado' }]
      },
      // ...otros valores por defecto
    }));

    const { container } = render(<Home />);
    expect(container.firstChild).toHaveClass('bg-gradient-to-br');
  });
});