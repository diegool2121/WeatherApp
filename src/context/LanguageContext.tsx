import { createContext, useContext, useState, ReactNode } from "react";
import es from "../i18n/es.json";
import en from "../i18n/en.json";

type Lang = "es" | "en";
const languages = { es, en };

interface LanguageContextProps {
  lang: Lang;
  texts: typeof es;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("es");
  const texts = languages[lang];

  return (
    <LanguageContext.Provider value={{ lang, texts, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return context;
};
