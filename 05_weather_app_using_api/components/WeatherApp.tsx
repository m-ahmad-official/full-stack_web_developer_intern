"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./WeatherApp.module.css";

interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  visibility: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  high: number;
  low: number;
}

function getWeatherEmoji(icon: string): string {
  const code = icon.slice(0, 2);
  const isNight = icon.endsWith("n");
  const map: Record<string, string> = {
    "01": isNight ? "🌙" : "☀️",
    "02": isNight ? "🌙" : "⛅",
    "03": "☁️",
    "04": "☁️",
    "09": "🌧️",
    "10": isNight ? "🌧️" : "🌦️",
    "11": "⛈️",
    "13": "❄️",
    "50": "🌫️",
  };
  return map[code] ?? "🌡️";
}

function formatTime(unix: number, offset: number): string {
  const date = new Date((unix + offset) * 1000);
  return date.toUTCString().slice(17, 22);
}

export default function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState<"day" | "night">("day");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [tzOffset, setTzOffset] = useState(0);

  useEffect(() => {
    const setAutoTheme = () => {
      const hour = new Date().getHours();
      setTheme(hour >= 6 && hour < 18 ? "day" : "night");
    };
    setAutoTheme();
    const interval = setInterval(setAutoTheme, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const fetchWeather = useCallback(
    async (city: string) => {
      if (!city.trim()) return;
      setLoading(true);
      setError("");
      setWeather(null);
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!API_KEY) {
        setError(
          "API key missing. Add NEXT_PUBLIC_WEATHER_API_KEY to .env.local",
        );
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`,
        );
        if (!res.ok) {
          if (res.status === 404)
            throw new Error("City not found. Please check the spelling.");
          if (res.status === 401) throw new Error("Invalid API key.");
          throw new Error("Something went wrong. Please try again.");
        }
        const data = await res.json();
        setTzOffset(data.timezone);
        const localHour = new Date(
          (Date.now() / 1000 + data.timezone) * 1000,
        ).getUTCHours();
        setTheme(localHour >= 6 && localHour < 18 ? "day" : "night");
        setWeather({
          city: data.name,
          country: data.sys.country,
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          windSpeed: Math.round(
            unit === "metric" ? data.wind.speed * 3.6 : data.wind.speed,
          ),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          visibility: Math.round(data.visibility / 1000),
          pressure: data.main.pressure,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          high: Math.round(data.main.temp_max),
          low: Math.round(data.main.temp_min),
        });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    [unit],
  );

  const handleSearch = () => fetchWeather(query);
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "km/h" : "mph";

  const details = weather
    ? [
        { icon: "💧", label: "Humidity", value: `${weather.humidity}%` },
        {
          icon: "💨",
          label: "Wind",
          value: `${weather.windSpeed} ${windUnit}`,
        },
        { icon: "👁", label: "Visibility", value: `${weather.visibility} km` },
        { icon: "🔵", label: "Pressure", value: `${weather.pressure} hPa` },
        {
          icon: "🌅",
          label: "Sunrise",
          value: formatTime(weather.sunrise, tzOffset),
        },
        {
          icon: "🌇",
          label: "Sunset",
          value: formatTime(weather.sunset, tzOffset),
        },
      ]
    : [];

  return (
    <div className={styles.page}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.container}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.controls}>
            <button
              className={styles.controlBtn}
              onClick={() =>
                setUnit((u) => (u === "metric" ? "imperial" : "metric"))
              }
            >
              {unit === "metric" ? "°C / km/h" : "°F / mph"}
            </button>
            {/* <button
              className={styles.themeBtn}
              onClick={() => setTheme((t) => (t === "day" ? "night" : "day"))}
              title="Toggle theme"
            >
              {theme === "day" ? "🌙" : "☀️"}
            </button> */}
          </div>
        </div>

        <h1 className={styles.title}>Weather</h1>
        <p className={styles.subtitle}>
          {theme === "day" ? "☀️ Good day!" : "🌙 Good evening!"} Search any
          city.
        </p>

        {/* Search */}
        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search city... e.g. Karachi, London"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            className={styles.searchBtn}
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? <span className={styles.spinner} /> : "🔍"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className={styles.errorCard}>
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div className={styles.skeleton}>
            <div className={styles.skeletonMain} />
            <div className={styles.skeletonRow}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={styles.skeletonDetail} />
              ))}
            </div>
          </div>
        )}

        {/* Weather card */}
        {weather && !loading && (
          <div className={styles.weatherCard}>
            <div className={styles.location}>
              <span>📍</span>
              <span className={styles.cityName}>{weather.city}</span>
              <span className={styles.countryBadge}>{weather.country}</span>
            </div>
            <div className={styles.mainTemp}>
              <div className={styles.weatherEmoji}>
                {getWeatherEmoji(weather.icon)}
              </div>
              <div className={styles.tempBlock}>
                <span className={styles.tempBig}>
                  {weather.temp}
                  {tempUnit}
                </span>
                <span className={styles.tempDesc}>{weather.description}</span>
                <div className={styles.hiLo}>
                  <span className={styles.hi}>
                    ↑ {weather.high}
                    {tempUnit}
                  </span>
                  <span className={styles.lo}>
                    ↓ {weather.low}
                    {tempUnit}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.feelsPill}>
              Feels like{" "}
              <strong>
                {weather.feelsLike}
                {tempUnit}
              </strong>
            </div>
            <div className={styles.detailGrid}>
              {details.map((d) => (
                <div key={d.label} className={styles.detailItem}>
                  <span className={styles.detailIcon}>{d.icon}</span>
                  <span className={styles.detailValue}>{d.value}</span>
                  <span className={styles.detailLabel}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!weather && !loading && !error && (
          <div className={styles.emptyState}>
            <div className={styles.emptyEmoji}>
              {theme === "day" ? "🌤️" : "🌌"}
            </div>
            <p className={styles.emptyText}>Enter a city name to get started</p>
          </div>
        )}

        <p className={styles.apiNote}>
          Powered by OpenWeatherMap · Theme switches by city local time
        </p>
      </div>
    </div>
  );
}
