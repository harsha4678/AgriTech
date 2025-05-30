
const WEATHER_API_KEY = "1cb5f89b2ce24ff28cb7b8be0154114d";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
}

export const weatherService = {
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };
  },

  async getForecast(lat: number, lon: number): Promise<ForecastData[]> {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    
    const data = await response.json();
    
    // Get daily forecasts (every 8th item represents ~24 hours)
    const dailyForecasts = data.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 5);
    
    return dailyForecasts.map((item: any) => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      temperature: {
        min: Math.round(item.main.temp_min),
        max: Math.round(item.main.temp_max),
      },
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));
  },

  async getWeatherByCity(city: string): Promise<WeatherData> {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };
  },
};
