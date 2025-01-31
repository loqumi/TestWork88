import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface CurrentWeather {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: [{
        main: string;
        description: string;
        icon: string;
    }];
    wind: {
        speed: number;
    };
    sys: {
        country: string;
    };
}

export interface ForecastItem {
    dt: number;
    main: {
        temp: number;
    };
    weather: [{
        icon: string;
    }];
}

export const getCurrentWeather = async (city: string) => {
    const response = await axios.get<CurrentWeather>(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
};