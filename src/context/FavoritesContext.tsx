import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
    favorites: number[];
    addFavorite: (photoId: number) => void;
    removeFavorite: (photoId: number) => void;
    isFavorite: (photoId: number) => boolean;
    toggleFavorite: (photoId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (photoId: number) => {
        setFavorites(current => {
            if (!current.includes(photoId)) {
                return [...current, photoId];
            }
            return current;
        });
    };

    const removeFavorite = (photoId: number) => {
        setFavorites(current => current.filter(id => id !== photoId));
    };

    const isFavorite = (photoId: number) => {
        return favorites.includes(photoId);
    };

    const toggleFavorite = (photoId: number) => {
        if (isFavorite(photoId)) {
            removeFavorite(photoId);
        } else {
            addFavorite(photoId);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
