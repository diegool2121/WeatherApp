import { useEffect, useRef } from "react";
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

const emojiSets = {
  cold: [
    "🥶", "❄️", "🧊", "🌨️", "💨", "☃️", "🧥", "🧣", "🌬️", "🪵", "🛷", "🏔️"
  ],
  mild: [
    "😄", "⛅", "🌤️", "🌈", "🍃", "🌻", "🧺", "🚶‍♂️", "🪁", "🧦", "🧢", "🪴"
  ],
  warm: [
    "😎", "🍹", "🌞", "🕶️", "🏖️", "🩴", "🌴", "🚲", "🧴", "🧊", "🛶", "🎐"
  ],
  hot: [
    "🥵", "🔥", "🌋", "☀️", "💦", "🍧", "🏜️", "🧯", "🌡️", "🚿", "🧃", "🕶️"
  ],
};

  let activeSet = emojiSets.mild;

  if (weather) {
    gradient = getTemperatureGradient(weather.main.temp);
    const temp = weather.main.temp;

    if (temp < 10) {
 
      activeSet = emojiSets.cold;
    } else if (temp < 20) {

      activeSet = emojiSets.mild;
    } else if (temp < 30) {
  
      activeSet = emojiSets.warm;
    } else {
   
      activeSet = emojiSets.hot;
    }
  }

  const emojiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!emojiContainerRef.current) return;

      for (let i = 0; i < 20; i++) {
        const e = document.createElement("div");
        e.className = "emoji";
        e.textContent = activeSet[Math.floor(Math.random() * activeSet.length)];
        e.style.top = Math.random() * window.innerHeight + "px";
        e.style.left = Math.random() * window.innerWidth + "px";
        emojiContainerRef.current.appendChild(e);
        setTimeout(() => e.remove(), 4000);
      }
    }, 1300);

    return () => clearInterval(interval);
  }, [activeSet]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradient} flex items-center justify-center p-4 transition-all duration-1000 relative`}>
      
      {/* Emojis animados en fondo */}
      <div ref={emojiContainerRef} className="absolute inset-0 overflow-hidden z-0"></div>


      {/* Contenido principal */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center relative z-10">
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

      <div className="absolute top-4 right-4 text-black z-10">
        <LanguageSwitcher />
      </div>
    </div>
  );
}