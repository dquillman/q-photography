import { useState, useMemo, useEffect } from 'react';
import { PHOTOS } from '../data/photos_final';
import { Heart } from 'lucide-react';
import Lightbox from '../components/Lightbox_v2';
import WallView from '../components/WallView';
import Testimonials from '../components/Testimonials';
import { useFavorites } from '../context/FavoritesContext';

const Home = () => {
    const [category, setCategory] = useState('All');
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
    const [showWallView, setShowWallView] = useState(false);
    const [wallViewPhoto, setWallViewPhoto] = useState<typeof PHOTOS[0] | null>(null);
    const [showBWOnly, setShowBWOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'title'>('newest');
    const { toggleFavorite, isFavorite } = useFavorites();

    // Get unique categories, filtering out undefined/null and ensuring strings
    const categories = ['All', ...new Set(PHOTOS.map(p => p.category).filter((c): c is string => !!c))];

    const filteredPhotos = useMemo(() => {
        console.log('Filtering by:', category);
        let filtered = category === 'All' ? PHOTOS : PHOTOS.filter(p => p.category === category);

        // Apply B&W filter if enabled
        if (showBWOnly) {
            filtered = filtered.filter(p => p.isBW === true);
        }

        // Apply search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category?.toLowerCase().includes(query)
            );
        }

        // Apply sort
        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                case 'title': return a.title.localeCompare(b.title);
                case 'newest': return b.id - a.id;
                default: return 0;
            }
        });

        console.log('Found:', filtered.length, 'photos');
        return filtered;
    }, [category, showBWOnly, searchQuery, sortBy]);

    const selectedPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

    const handlePhotoClick = (index: number) => {
        setSelectedPhotoIndex(index);
    };

    const handleCloseLightbox = () => {
        setSelectedPhotoIndex(null);
    };

    const handleNextPhoto = () => {
        if (selectedPhotoIndex !== null && selectedPhotoIndex < filteredPhotos.length - 1) {
            setSelectedPhotoIndex(selectedPhotoIndex + 1);
        }
    };

    const handlePrevPhoto = () => {
        if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
            setSelectedPhotoIndex(selectedPhotoIndex - 1);
        }
    };

    // Handle browser back button for Wall View
    useEffect(() => {
        const handlePopState = () => {
            if (!window.location.hash.includes('wall-view')) {
                setShowWallView(false);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleViewInRoom = () => {
        if (selectedPhoto) {
            setWallViewPhoto(selectedPhoto);
            setShowWallView(true);
            setSelectedPhotoIndex(null);
            window.history.pushState({ wallView: true }, '', '#wall-view');
        }
    };

    const handleCloseWallView = () => {
        if (window.location.hash.includes('wall-view')) {
            window.history.back();
        } else {
            setShowWallView(false);
        }
    };

    return (
        <div className="container section">
            <header className="text-center mb-xl">
                <h1 className="hero-title">
                    Visual Stories for <br />
                    <span className="text-gradient">Your Space</span>
                </h1>
                <p className="text-secondary section-title" style={{ fontSize: '1.25rem', fontWeight: 400 }}>
                    Premium photography prints curated for modern interiors.
                    Explore the collection and find the perfect piece for your wall.
                </p>
            </header>

            {/* Search & Sort Bar */}
            <div className="search-sort-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search photos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="title">Title: A-Z</option>
                </select>
            </div>

            {/* Category Filter */}
            <div className="flex-center mb-lg" style={{ gap: '1rem', flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`btn ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
                        style={{
                            borderRadius: '2rem',
                            padding: '0.5rem 1.5rem',
                            textTransform: 'capitalize',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* B&W Toggle */}
            <div className="flex-center mb-lg">
                <label className="flex-center" style={{ gap: '0.5rem', cursor: 'pointer', userSelect: 'none' }}>
                    <input
                        type="checkbox"
                        checked={showBWOnly}
                        onChange={(e) => setShowBWOnly(e.target.checked)}
                        style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                    />
                    <span className="text-secondary">Black & White Only</span>
                </label>
            </div>

            <div className="grid-gallery">
                {filteredPhotos.map((photo, index) => (
                    <div
                        key={photo.id}
                        className="photo-card"
                        onClick={() => handlePhotoClick(index)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="photo-card-image">
                            <img
                                src={photo.url}
                                alt={photo.title}
                                loading="lazy"
                            />
                            <div className="photo-card-overlay">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(photo.id);
                                    }}
                                    className="favorite-btn"
                                    aria-label={isFavorite(photo.id) ? "Remove from favorites" : "Add to favorites"}
                                >
                                    <Heart
                                        size={24}
                                        fill={isFavorite(photo.id) ? "currentColor" : "none"}
                                        className={isFavorite(photo.id) ? "text-red-500" : "text-white"}
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

            {/* Testimonials Section */}
            <Testimonials />

            {/* Lightbox */}
            {selectedPhoto && (
                <Lightbox
                    photo={selectedPhoto}
                    onClose={handleCloseLightbox}
                    onNext={handleNextPhoto}
                    onPrev={handlePrevPhoto}
                    hasNext={selectedPhotoIndex !== null && selectedPhotoIndex < filteredPhotos.length - 1}
                    hasPrev={selectedPhotoIndex !== null && selectedPhotoIndex > 0}
                    onViewInRoom={handleViewInRoom}
                />
            )}

            {/* Wall View */}
            {showWallView && wallViewPhoto && (
                <WallView
                    photoUrl={wallViewPhoto.url}
                    onClose={handleCloseWallView}
                />
            )}
        </div>
    );
};

export default Home;
