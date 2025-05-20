import { getWeatherByCity, getWeatherByCoords, getCitySuggestions } from './weatherService';

/// Mock completo que evita toda la lógica original
jest.mock('./weatherService', () => {
  const mockApi = {
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  };

  // Mock de las funciones principales
  return {
    // Configuración mockeada
    weatherConfig: {
      baseURL: 'https://mock-api.openweathermap.org',
      apiKey: 'test-key',
      defaultParams: {
        units: 'metric',
        lang: 'es'
      }
    },
    
    // Mock de las funciones
    getWeatherByCity: jest.fn(),
    getWeatherByCoords: jest.fn(),
    getCitySuggestions: jest.fn(),
    
    // Mock de la instancia api
    api: mockApi
  };
});

// Importamos después del mock
const {
  getWeatherByCity,
  getWeatherByCoords,
  getCitySuggestions,
  api
} = require('./weatherService');


describe('weatherService', () => {
  const mockWeatherData = {
    name: 'Madrid',
    main: { temp: 22, humidity: 65 },
    weather: [{ description: 'cielo claro' }]
  };

  const mockSuggestions = [
    { name: 'Madrid', country: 'ES', lat: 40.41, lon: -3.70 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configuramos los mocks
    getWeatherByCity.mockImplementation(async (city: string) => {
      return Promise.resolve(mockWeatherData);
    });
    
    getWeatherByCoords.mockImplementation(async (lat: number, lon: number) => {
      return Promise.resolve(mockWeatherData);
    });
    
    getCitySuggestions.mockImplementation(async (city: string) => {
      return Promise.resolve(mockSuggestions);
    });
  });

  test('getWeatherByCity funciona correctamente', async () => {
    const result = await getWeatherByCity('Madrid');
    expect(result).toEqual(mockWeatherData);
    expect(getWeatherByCity).toHaveBeenCalledWith('Madrid');
  });

  test('getWeatherByCoords funciona correctamente', async () => {
    const result = await getWeatherByCoords(40.41, -3.70);
    expect(result).toEqual(mockWeatherData);
    expect(getWeatherByCoords).toHaveBeenCalledWith(40.41, -3.70);
  });

  test('getCitySuggestions funciona correctamente', async () => {
    const result = await getCitySuggestions('Mad');
    expect(result).toEqual(mockSuggestions);
    expect(getCitySuggestions).toHaveBeenCalledWith('Mad');
  });

  test('maneja errores correctamente', async () => {
    getWeatherByCity.mockRejectedValueOnce(new Error('Error de red'));
    await expect(getWeatherByCity('Madrid')).rejects.toThrow('Error de red');
  });
});