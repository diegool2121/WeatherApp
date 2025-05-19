import { WeatherData } from "../models/weather";
import { useLanguage } from "../context/LanguageContext";

export function WeatherCard({ weather }: { weather: WeatherData }) {
    const { texts } = useLanguage();
  return (
    <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow-inner">
      <h2 className="text-2xl font-semibold text-black">
        {texts.weather_in} {weather.name}
      </h2>
      <p className="mt-2 text-lg text-black">
        🌡️ <strong>{texts.temperature}</strong> {weather.main.temp} °C
      </p>
      <p className="text-lg text-black">
        💧 <strong>{texts.humidity}</strong> {weather.main.humidity}%
      </p>
      <p className="text-lg text-black">
        🌤️ <strong>{texts.description}</strong> {weather.weather[0].description}
      </p>
    </div>
  );
}

