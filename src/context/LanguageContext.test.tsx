import React, { ReactNode } from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguageProvider, useLanguage } from './LanguageContext';


// Mock de los archivos de idioma 
jest.mock('../i18n/es.json', () => ({
  weather_in: 'Clima en',
  temperature: 'Temperatura',
  search_button: 'Buscar'
}));

jest.mock('../i18n/en.json', () => ({
  weather_in: 'Weather in',
  temperature: 'Temperature',
  search_button: 'Search'
}));

// Componente de prueba para usar el contexto
const TestComponent = () => {
  const { lang, texts, setLang } = useLanguage();
  return (
    <div>
      <div data-testid="current-lang">{lang}</div>
      <div data-testid="current-text">{texts.weather_in}</div>
      <button onClick={() => setLang('en')}>Change to English</button>
      <button onClick={() => setLang('es')}>Change to Spanish</button>
    </div>
  );
};

describe('LanguageContext', () => {
  test('proporciona el contexto por defecto en español', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('es');
    expect(screen.getByTestId('current-text')).toHaveTextContent('Clima en');
  });

  test('permite cambiar el idioma a inglés', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    act(() => {
      screen.getByText('Change to English').click();
    });

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    expect(screen.getByTestId('current-text')).toHaveTextContent('Weather in');
  });

  test('permite cambiar el idioma de vuelta a español', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // Cambiar primero a inglés
    act(() => {
      screen.getByText('Change to English').click();
    });
    // Luego volver a español
    act(() => {
      screen.getByText('Change to Spanish').click();
    });

    expect(screen.getByTestId('current-lang')).toHaveTextContent('es');
    expect(screen.getByTestId('current-text')).toHaveTextContent('Clima en');
  });

  test('useLanguage lanza error si se usa fuera del Provider', () => {
    // Para evitar que console.error afecte el output del test
    const originalError = console.error;
    console.error = jest.fn();
    
    expect(() => render(<TestComponent />)).toThrow(
      'useLanguage debe usarse dentro de LanguageProvider'
    );
    
    console.error = originalError;
  });

  test('proporciona todos los textos del idioma seleccionado', () => {
    const ConsumerComponent = () => {
      const { texts } = useLanguage();
      return (
        <div>
          <div data-testid="text-temperature">{texts.temperature}</div>
          <div data-testid="text-search">{texts.search_button}</div>
        </div>
      );
    };

    render(
      <LanguageProvider>
        <ConsumerComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('text-temperature')).toHaveTextContent('Temperatura');
    expect(screen.getByTestId('text-search')).toHaveTextContent('Buscar');
  });

  test('actualiza todos los textos al cambiar de idioma', () => {
    const ConsumerComponent = () => {
      const { texts, setLang } = useLanguage();
      return (
        <div>
          <div data-testid="text-temperature">{texts.temperature}</div>
          <button onClick={() => setLang('en')}>Change Language</button>
        </div>
      );
    };

    render(
      <LanguageProvider>
        <ConsumerComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('text-temperature')).toHaveTextContent('Temperatura');

    act(() => {
      screen.getByText('Change Language').click();
    });

    expect(screen.getByTestId('text-temperature')).toHaveTextContent('Temperature');
  });
});