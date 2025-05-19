import { Suggestion } from "../models/suggestion";
import { useLanguage } from "../context/LanguageContext";


export function CitySearch({ city, setCity, suggestions, onSelect }: {
  city: string;
  setCity: (value: string) => void;
  suggestions: Suggestion[];
  onSelect: (lat: number, lon: number, name: string, country: string) => void;
}) {
    const { texts } = useLanguage();
  return (
    <div className="relative mb-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder={texts.search_placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 left-0 right-0 bg-white border mt-1 rounded-lg shadow-md max-h-40 overflow-y-auto text-left text-black">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => onSelect(s.lat, s.lon, s.name, s.country)}
            >
              {s.name}{s.state ? `, ${s.state}` : ""}, {s.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}