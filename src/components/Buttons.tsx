import { useLanguage } from "../context/LanguageContext";

export function Buttons({ onSearch, onLocation }: { onSearch: () => void; onLocation: () => void }) {
        const { texts } = useLanguage();
  return (
    <div className="flex justify-center gap-2 mb-4">
      <button onClick={onSearch} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        {texts.search_button}
      </button>
      <button onClick={onLocation} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
        📍 {texts.user_location}
      </button>
    </div>
  );
}
