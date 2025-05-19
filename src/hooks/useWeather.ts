import { useState, useEffect } from "react";
import { WeatherData } from "../models/weather";
import { Suggestion } from "../models/suggestion";
import { getWeatherByCity, getWeatherByCoords, getCitySuggestions } from "../services/weatherService";

export const useWeather = () => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const searchWeather = async (lat?: number, lon?: number) => {
    try {
      setError("");
      const data = lat !== undefined && lon !== undefined
        ? await getWeatherByCoords(lat, lon)
        : await getWeatherByCity(city);
      setWeather(data);
      setSuggestions([]);
      setCity("");
    } catch {
      setError("Ciudad no encontrada o error en la solicitud.");
      setWeather(null);
    }
  };

  const fetchSuggestions = async () => {
    if (city.length < 2) return setSuggestions([]);
    try {
      const data = await getCitySuggestions(city);
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(timeout);
  }, [city]);

  const getLocationWeather = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => searchWeather(coords.latitude, coords.longitude),
        () => setError("No se pudo acceder a tu ubicación.")
      );
    } else {
      setError("Tu navegador no soporta geolocalización.");
    }
  };

  return { city, setCity, suggestions, weather, error, searchWeather, getLocationWeather };
};