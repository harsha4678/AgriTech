
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, AlertTriangle } from "lucide-react";

const WeatherAdvisory = () => {
  const [location, setLocation] = useState("Central Valley, CA");

  const currentWeather = {
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    visibility: 10,
    uvIndex: 6,
    precipitation: 0
  };

  const forecast = [
    { day: "Today", high: 75, low: 58, condition: "Partly Cloudy", icon: Cloud, precipitation: 10 },
    { day: "Tomorrow", high: 78, low: 61, condition: "Sunny", icon: Sun, precipitation: 0 },
    { day: "Wednesday", high: 74, low: 59, condition: "Light Rain", icon: CloudRain, precipitation: 60 },
    { day: "Thursday", high: 71, low: 56, condition: "Cloudy", icon: Cloud, precipitation: 20 },
    { day: "Friday", high: 76, low: 60, condition: "Sunny", icon: Sun, precipitation: 5 },
    { day: "Saturday", high: 79, low: 63, condition: "Partly Cloudy", icon: Cloud, precipitation: 15 },
    { day: "Sunday", high: 77, low: 62, condition: "Sunny", icon: Sun, precipitation: 0 }
  ];

  const alerts = [
    {
      type: "warning",
      title: "Frost Warning",
      description: "Temperatures may drop below 32°F tonight. Protect sensitive crops.",
      time: "Tonight 2:00 AM - 6:00 AM"
    },
    {
      type: "info",
      title: "Optimal Planting Conditions",
      description: "Perfect weather conditions for planting tomatoes this week.",
      time: "This Week"
    }
  ];

  const farmingTips = [
    {
      title: "Irrigation Timing",
      tip: "Based on today's humidity (65%), reduce watering by 20% to prevent overwatering.",
      icon: Droplets
    },
    {
      title: "Pest Management",
      tip: "Warm, humid conditions are ideal for aphids. Monitor plants closely.",
      icon: Eye
    },
    {
      title: "Harvest Timing",
      tip: "Rain expected Wednesday - harvest ripe fruits before then.",
      icon: CloudRain
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-4">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">Weather Advisory</h1>
            <p className="text-muted-foreground">Local weather insights for smart farming decisions</p>
          </div>
        </div>

        {/* Location Selector */}
        <div className="mb-8">
          <div className="flex space-x-4 max-w-md">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your farm location..."
            />
            <Button className="gradient-primary text-white">
              Update
            </Button>
          </div>
        </div>

        {/* Current Weather */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cloud className="w-5 h-5 mr-2" />
                Current Weather - {location}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">
                    {currentWeather.temperature}°F
                  </div>
                  <p className="text-xl text-muted-foreground">{currentWeather.condition}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Droplets className="w-5 h-5 text-blue-500 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="font-semibold">{currentWeather.humidity}%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Wind className="w-5 h-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Wind Speed</p>
                      <p className="font-semibold">{currentWeather.windSpeed} mph</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Eye className="w-5 h-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">Visibility</p>
                      <p className="font-semibold">{currentWeather.visibility} mi</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Sun className="w-5 h-5 text-orange-500 mr-2" />
                    <div>
                      <p className="text-sm text-muted-foreground">UV Index</p>
                      <p className="font-semibold">{currentWeather.uvIndex}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                Weather Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.type === 'warning' 
                        ? 'bg-orange-50 border-orange-500 dark:bg-orange-900/20' 
                        : 'bg-blue-50 border-blue-500 dark:bg-blue-900/20'
                    }`}
                  >
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 7-Day Forecast */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {forecast.map((day, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="font-semibold text-sm mb-2">{day.day}</p>
                  <day.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground mb-2">{day.condition}</p>
                  <div className="text-sm">
                    <span className="font-semibold">{day.high}°</span>
                    <span className="text-muted-foreground">/{day.low}°</span>
                  </div>
                  <p className="text-xs text-blue-500 mt-1">{day.precipitation}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Farming Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Weather-Based Farming Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {farmingTips.map((tip, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center mb-3">
                    <tip.icon className="w-5 h-5 text-primary mr-2" />
                    <h4 className="font-semibold">{tip.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip.tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherAdvisory;
