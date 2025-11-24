import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Eye, Check } from 'lucide-react';
import WallView from '../components/WallView';
import ShareButtons from '../components/ShareButtons';
import EditionBadge from '../components/EditionBadge';
import { useCart } from '../context/CartContext';
import { PHOTOS } from '../data/photos_final';

const PhotoDetail = () => {
    const { id } = useParams();
    const [showWallView, setShowWallView] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const { addToCart } = useCart();

    const photo = PHOTOS.find(p => p.id === Number(id));

    // Set default size when photo loads - MUST be in useEffect to avoid render loop
    useEffect(() => {
        if (photo && !selectedSize && photo.sizes && photo.sizes.length > 0) {
            setSelectedSize(photo.sizes[0].size);
        }
    }, [photo, selectedSize]);

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

    const handleOpenWallView = () => {
        setShowWallView(true);
        window.history.pushState({ wallView: true }, '', '#wall-view');
    };

    const handleCloseWallView = () => {
        if (window.location.hash.includes('wall-view')) {
            window.history.back();
        } else {
            setShowWallView(false);
        }
    };

    if (!photo) {
        return (
            <div className="container section text-center">
                <h2 className="section-title">Photo not found</h2>
                <Link to="/" className="text-accent hover:underline">Return to Gallery</Link>
            </div>
        );
    }

    const selectedPrintSize = photo.sizes?.find(s => s.size === selectedSize) || photo.sizes?.[0];

    if (!selectedPrintSize) {
        return (
            <div className="container section text-center">
                <h2 className="section-title">No print sizes available</h2>
                <p>Please contact support.</p>
            </div>
        );
    }

    const relatedPhotos = useMemo(() => {
        return PHOTOS
            .filter(p => p.category === photo.category && p.id !== photo.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
    }, [photo]);

    const handleAddToCart = () => {
        addToCart({
            id: photo.id,
            title: photo.title,
            price: selectedPrintSize.price,
            image: photo.url,
            size: selectedSize
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const isSoldOut = photo.edition?.remaining === 0;

    return (
        <div className="container section">
            <Link to="/" className="btn btn-icon mb-lg" style={{ display: 'inline-flex', gap: '0.5rem', paddingLeft: 0 }}>
                <ArrowLeft size={20} />
                Back to Gallery
            </Link>

            <div className="grid-2-col">
                {/* Image Section */}
                <div style={{ position: 'relative' }}>
                    <div className="photo-card-image" style={{ marginBottom: 0, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                        <img
                            src={photo.url}
                            alt={photo.title}
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
                    <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{photo.title}</h1>
                    <p className="text-accent" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>${photo.price}</p>

                    <div style={{ marginBottom: '2rem' }}>
                        <ShareButtons
                            url={window.location.href}
                            title={photo.title}
                            imageUrl={photo.url}
                        />
                    </div>

                    {photo.edition && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <EditionBadge
                                total={photo.edition.total}
                                remaining={photo.edition.remaining}
                            />
                        </div>
                    )}

                    <div className="text-secondary mb-lg" style={{ lineHeight: 1.8 }}>
                        <p style={{ marginBottom: '1rem' }}>{photo.description}</p>
                        <p>Printed on premium archival paper with a matte finish. Signed by the artist.</p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem', marginBottom: '2rem' }}>
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Select Size</h3>
                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {photo.sizes.map((printSize) => (
                                <label
                                    key={printSize.size}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '1rem',
                                        border: `2px solid ${selectedSize === printSize.size ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        background: selectedSize === printSize.size ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <input
                                            type="radio"
                                            name="size"
                                            value={printSize.size}
                                            checked={selectedSize === printSize.size}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                            style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                                        />
                                        <div>
                                            <div className="text-primary" style={{ fontWeight: 600 }}>{printSize.size}"</div>
                                            {printSize.description && (
                                                <div className="text-secondary" style={{ fontSize: '0.875rem' }}>{printSize.description}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-accent" style={{ fontWeight: 600, fontSize: '1.125rem' }}>
                                        ${printSize.price}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <button
                            onClick={handleAddToCart}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem' }}
                            disabled={isSoldOut || addedToCart}
                        >
                            {addedToCart ? (
                                <>
                                    <Check size={20} />
                                    Added to Cart
                                </>
                            ) : isSoldOut ? (
                                'Sold Out'
                            ) : (
                                <>
                                    <ShoppingBag size={20} />
                                    Add to Cart - ${selectedPrintSize.price}
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleOpenWallView}
                            className="btn btn-secondary"
                            style={{ width: '100%', padding: '1rem' }}
                        >
                            <Eye size={20} />
                            View in Room
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Photos Section */}
            {relatedPhotos.length > 0 && (
                <div className="container" style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
                    <h2 className="section-title" style={{ marginBottom: '2rem' }}>You Might Also Like</h2>
                    <div className="grid-gallery">
                        {relatedPhotos.map((relatedPhoto) => (
                            <Link
                                key={relatedPhoto.id}
                                to={`/photo/${relatedPhoto.id}`}
                                className="photo-card"
                            >
                                <div className="photo-card-image">
                                    <img
                                        src={relatedPhoto.url}
                                        alt={relatedPhoto.title}
                                        loading="lazy"
                                    />
                                    <div className="photo-card-overlay" />
                                </div>
                                <div className="photo-info">
                                    <div>
                                        <h3 className="card-title text-primary">{relatedPhoto.title}</h3>
                                        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>{relatedPhoto.category} Print</p>
                                    </div>
                                    <span className="card-title">${relatedPhoto.price}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {showWallView && (
                <WallView
                    photoUrl={photo.url}
                    onClose={handleCloseWallView}
                />
            )}
        </div>
    );
};

export default PhotoDetail;
