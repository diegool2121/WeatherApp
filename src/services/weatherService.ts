// services/weatherService.ts
import axios from "axios";
import { WeatherData } from "../models/weather";
import { Suggestion } from "../models/suggestion";

// Cliente Axios configurado
const api = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    appid: process.env.NEXT_PUBLIC_API_KEY,
    units: "metric",
    lang: "es",
  },
});

// Función para obtener el clima por ciudad
export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await api.get<WeatherData>("/data/2.5/weather", {
    params: { q: city },
  });
  return response.data;
};

// Función para obtener el clima por coordenadas
export const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await api.get<WeatherData>("/data/2.5/weather", {
    params: { lat, lon },
  });
  return response.data;
};

// Función para obtener sugerencias de ciudades
export const getCitySuggestions = async (city: string): Promise<Suggestion[]> => {
  const response = await api.get<Suggestion[]>("/geo/1.0/direct", {
    params: { q: city, limit: 5 },
  });
  return response.data;
};
