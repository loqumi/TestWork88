import { router } from "next/client";
import { CurrentWeather } from '@/services/weather';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';

export const WeatherCard = ({ weather }: { weather: CurrentWeather }) => (
    <a onClick={() => router.push(`/forecast/${weather.name}`)} className="card mb-3">
        <div className="card-body">
            <h2 className="card-title">
                {weather.name}, {weather.sys.country}
            </h2>
            <div className="d-flex align-items-center">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="Weather icon"
                    className="weather-icon"
                />
                <div>
                    <p className="h1">{Math.round(weather.main.temp)}°C</p>
                    <p>{weather.weather[0].description}</p>
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <div><WiHumidity /> {weather.main.humidity}%</div>
                <div><WiStrongWind /> {weather.wind.speed} m/s</div>
            </div>
        </div>
    </a>
);