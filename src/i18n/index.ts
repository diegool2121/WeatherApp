import es from "./es.json";
import en from "./en.json";

const languages = { es, en };

type Lang = "es" | "en";

// Idioma predeterminado
const defaultLang: Lang = "es";

// Obtener textos por idioma
export const getTexts = (lang: Lang = defaultLang) => {
  return languages[lang];
};
