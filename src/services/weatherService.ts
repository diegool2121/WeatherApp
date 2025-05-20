import axios from "axios";
import { WeatherData } from "../models/weather";
import { Suggestion } from "../models/suggestion";
import { weatherConfig } from "../config/weather";

// Verificar que las variables de entorno estén configuradas
if (!weatherConfig.baseURL || !weatherConfig.apiKey) {
  throw new Error("Weather API configuration is missing. Please check your environment variables.");
}

// Cliente Axios configurado
const api = axios.create({
  baseURL: weatherConfig.baseURL,
  params: {
    appid: weatherConfig.apiKey,
    ...weatherConfig.defaultParams,
  },
});

// Tipos para las funciones de servicio
export interface WeatherService {
  getWeatherByCity: (city: string) => Promise<WeatherData>;
  getWeatherByCoords: (lat: number, lon: number) => Promise<WeatherData>;
  getCitySuggestions: (city: string) => Promise<Suggestion[]>;
}

// Implementación del servicio
export const weatherService: WeatherService = {
  getWeatherByCity: async (city) => {
    const response = await api.get<WeatherData>("/data/2.5/weather", {
      params: { q: city },
    });
    return response.data;
  },

  getWeatherByCoords: async (lat, lon) => {
    const response = await api.get<WeatherData>("/data/2.5/weather", {
      params: { lat, lon },
    });
    return response.data;
  },

  getCitySuggestions: async (city) => {
    const response = await api.get<Suggestion[]>("/geo/1.0/direct", {
      params: { q: city, limit: 5 },
    });
    return response.data;
  },
};

export const { getWeatherByCity, getWeatherByCoords, getCitySuggestions } = weatherService;