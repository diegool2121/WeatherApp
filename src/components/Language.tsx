import { FaFlagUsa, FaFlag } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSwitcher() {
    const { lang, setLang } = useLanguage();

    return (
        <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 flex items-center gap-2"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
        >
            {lang === "es" ? <FaFlagUsa className="w-5 h-5" /> : <FaFlag className="w-5 h-5" />}
            {lang === "es" ? "US" : "ES"}
        </button>
    );
}