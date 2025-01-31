import { useEffect, useState } from 'react';
import { useFavoritesStore } from '@/stores/favorites';
import { CurrentWeather, getCurrentWeather } from '@/services/weather';
import { WeatherCard } from '@/components/WeatherCard';

export default function Favorites() {
    const { cities, removeCity } = useFavoritesStore();
    const [weatherData, setWeatherData] = useState<CurrentWeather[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await Promise.all(
                    cities.map(c => getCurrentWeather(c.name))
                );
                setWeatherData(data);
            } finally {
                setLoading(false);
            }
        })();
    }, [cities]);

    return (
        <div className="container">
            <h1 className="mb-4">Favorite Cities</h1>
            {loading ? (
                <div className="spinner-border" role="status" />
            ) : (
                <div className="row">
                    {weatherData.length > 0 ? (
                        weatherData.map((weather) => (
                                <div key={weather.id} className="col-md-6 mb-3">
                                    <WeatherCard weather={weather} />
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeCity(`${weather.name}-${weather.sys.country}`)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))
                    ) : (
                        <div className={"text-center"}>It looks like you haven't added any cities to your favorites :(</div>
                    )}
                </div>
            )}
        </div>
    );
}