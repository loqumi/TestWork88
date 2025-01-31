import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {ForecastItem, getForecast} from '@/services/weather';
import { toast } from 'react-toastify';

export default function Forecast() {
    const router = useRouter();
    const { city } = router.query;
    const [forecast, setForecast] = useState<ForecastItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!city) return;
        (async () => {
            try {
                const data = await getForecast(city as string);
                setForecast(data.filter((_, i) => i % 8 === 0));
            } catch (error) {
                toast.error('Error loading forecast');
            } finally {
                setLoading(false);
            }
        })();
    }, [city]);

    return (
        <div className="container">
            <h1 className="mb-4">{city} - 5 Day Forecast</h1>
            {loading ? (
                <div className="spinner-border" role="status" />
            ) : (
                <div className="row">
                    {forecast.map((item) => (
                        <div key={item.dt} className="col-6 col-md-4 col-lg-2 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5>{new Date(item.dt * 1000).toLocaleDateString()}</h5>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                        alt="Weather icon"
                                        className="weather-icon"
                                    />
                                    <p>{Math.round(item.main.temp)}°C</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}