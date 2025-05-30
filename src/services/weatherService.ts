
const WEATHER_API_KEY = "1cb5f89b2ce24ff28cb7b8be0154114d";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  uvIndex: number;
  precipitation: number;
  icon: string;
}

export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
  icon: string;
}

export interface WeatherAlert {
  type: 'warning' | 'info';
  title: string;
  description: string;
  time: string;
}

export const fetchCurrentWeather = async (location: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=imperial`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      visibility: Math.round((data.visibility || 10000) / 1609.34), // Convert to miles
      uvIndex: 6, // OpenWeather UV requires separate API call
      precipitation: Math.round((data.rain?.['1h'] || 0) * 100),
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

export const fetchWeatherForecast = async (location: string): Promise<ForecastDay[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=imperial`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data not found');
    }
    
    const data = await response.json();
    
    // Group by day and get daily highs/lows
    const dailyData = new Map();
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!dailyData.has(dayKey)) {
        dailyData.set(dayKey, {
          temps: [item.main.temp],
          conditions: [item.weather[0]],
          precipitation: item.pop * 100
        });
      } else {
        const dayData = dailyData.get(dayKey);
        dayData.temps.push(item.main.temp);
        dayData.conditions.push(item.weather[0]);
      }
    });
    
    const forecast: ForecastDay[] = [];
    let dayIndex = 0;
    
    for (const [dateString, dayData] of dailyData) {
      if (forecast.length >= 7) break;
      
      const date = new Date(dateString);
      const dayName = dayIndex === 0 ? 'Today' : 
                     dayIndex === 1 ? 'Tomorrow' : 
                     date.toLocaleDateString('en-US', { weekday: 'long' });
      
      forecast.push({
        day: dayName,
        high: Math.round(Math.max(...dayData.temps)),
        low: Math.round(Math.min(...dayData.temps)),
        condition: dayData.conditions[0].description,
        precipitation: Math.round(dayData.precipitation),
        icon: dayData.conditions[0].icon
      });
      
      dayIndex++;
    }
    
    return forecast;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export const generateWeatherAlerts = (weather: WeatherData): WeatherAlert[] => {
  const alerts: WeatherAlert[] = [];
  
  if (weather.temperature < 35) {
    alerts.push({
      type: 'warning',
      title: 'Frost Warning',
      description: 'Low temperatures may damage sensitive crops. Consider protective measures.',
      time: 'Tonight'
    });
  }
  
  if (weather.precipitation > 70) {
    alerts.push({
      type: 'warning',
      title: 'Heavy Rain Expected',
      description: 'High precipitation forecast. Ensure proper drainage and harvest ripe crops.',
      time: 'Next 24 hours'
    });
  }
  
  if (weather.temperature > 85 && weather.humidity < 30) {
    alerts.push({
      type: 'info',
      title: 'Hot & Dry Conditions',
      description: 'Increase irrigation frequency and monitor for heat stress.',
      time: 'Current'
    });
  }
  
  return alerts;
};
