import { useState } from 'react';
import { toast } from 'react-toastify';
import {CurrentWeather, getCurrentWeather} from '@/services/weather';
import { WeatherCard } from '@/components/WeatherCard';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const data = await getCurrentWeather(city);
      setWeather(data);
    } catch (error) {
      toast.error('City not found');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="container">
        <div className="row mb-4">
          <div className="col">
            <form onSubmit={handleSearch} className="d-flex gap-5">
              <input
                  required
                  type="text"
                  className="form-control w-100"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
              />
              <button
                  className="btn btn-primary"
                  onClick={handleSearch}
                  disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>
        </div>

        {weather ? (
            <div className="row">
              <div className="col-md-6">
                <WeatherCard weather={weather} />
              </div>
            </div>
        ) : <div className="text-center">There are no content let`s find it!</div>}
      </div>
  );
}