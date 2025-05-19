import { useWeather } from "../hooks/useWeather";
import { getTemperatureGradient } from "../utils/getTemperatureGradient";
import { CitySearch } from "../components/CitySearch";
import { WeatherCard } from "../components/WeatherCard";
import { Buttons } from "../components/Buttons";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "../components/Language";

export default function Home() {
  const { city, setCity, suggestions, weather, error, searchWeather, getLocationWeather } = useWeather();
  const { texts } = useLanguage();

  let gradient = "from-blue-200 to-blue-500";
  if (weather) {
    gradient = getTemperatureGradient(weather.main.temp);
  }
  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} flex items-center justify-center p-4 transition-all duration-1000`}>
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center relative">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">☁️ {texts.app_name}</h1>

        <CitySearch
          city={city}
          setCity={setCity}
          suggestions={suggestions}
          onSelect={(lat, lon, name, country) => {
            setCity(`${name}, ${country}`);
            searchWeather(lat, lon);
          }}
        />

        <Buttons onSearch={() => searchWeather()} onLocation={getLocationWeather} />

        {error && <p className="text-red-600 font-medium">{error}</p>}

        {weather && <WeatherCard weather={weather} />}
      </div>
      <div className="absolute top-4 right-4 text-black">
      <LanguageSwitcher />
      </div>
    </div>
  );
}