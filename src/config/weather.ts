export const weatherConfig = {
  baseURL: process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL,
  apiKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  defaultParams: {
    units: "metric",
    lang: "es",
  },
};