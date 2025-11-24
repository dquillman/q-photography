import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PHOTOS } from '../data/photos_final';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
    const { favorites, toggleFavorite } = useFavorites();

    const favoritePhotos = PHOTOS.filter(photo => favorites.includes(photo.id));

    if (favoritePhotos.length === 0) {
        return (
            <div className="container section">
                <h1 className="section-title text-center mb-xl">Your Favorites</h1>
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    background: 'var(--color-surface)',
                    borderRadius: '1rem',
                    border: '1px solid var(--color-border)'
                }}>
                    <Heart size={64} className="text-secondary" style={{ margin: '0 auto 1rem' }} />
                    <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>No favorites yet</h2>
                    <p className="text-secondary" style={{ marginBottom: '2rem' }}>
                        Click the heart icon on any photo to add it to your favorites
                    </p>
                    <Link to="/" className="btn btn-primary">
                        Browse Gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container section">
            <div className="flex-between mb-xl">
                <h1 className="section-title">Your Favorites</h1>
                <p className="text-secondary">{favoritePhotos.length} {favoritePhotos.length === 1 ? 'photo' : 'photos'}</p>
            </div>

            <div className="grid-gallery">
                {favoritePhotos.map((photo) => (
                    <div key={photo.id} className="photo-card">
                        <div className="photo-card-image">
                            <Link to={`/photo/${photo.id}`}>
                                <img
                                    src={photo.url}
                                    alt={photo.title}
                                    loading="lazy"
                                />
                            </Link>
                            <div className="photo-card-overlay">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(photo.id);
                                    }}
                                    className="favorite-btn"
                                    style={{ opacity: 1, transform: 'scale(1)' }}
                                    aria-label="Remove from favorites"
                                >
                                    <Heart
                                        size={24}
                                        fill="currentColor"
                                        className="text-red-500"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="photo-info">
                            <div>
                                <h3 className="card-title text-primary">{photo.title}</h3>
                                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>{photo.category} Print</p>
                            </div>
                            <span className="card-title">${photo.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
