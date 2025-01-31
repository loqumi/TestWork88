import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface City {
    id: string;
    name: string;
    country: string;
}

interface FavoritesState {
    cities: City[];
    addCity: (city: City) => void;
    removeCity: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set) => ({
            cities: [],
            addCity: (city) => set((state) => ({ cities: [...state.cities, city] })),
            removeCity: (id) =>
                set((state) => ({ cities: state.cities.filter(c => c.id !== id) })),
        }),
        { name: 'favorites-store' }
    )
);