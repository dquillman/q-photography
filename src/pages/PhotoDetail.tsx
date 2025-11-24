import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Eye, Check } from 'lucide-react';
import WallView from '../components/WallView';
import { useCart } from '../context/CartContext';
import { PHOTOS } from '../data/photos';

const PhotoDetail = () => {
    const { id } = useParams();
    const [showWallView, setShowWallView] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addToCart } = useCart();

    const photo = PHOTOS.find(p => p.id === Number(id));

    if (!photo) {
        return (
            <div className="container section text-center">
                <h2 className="section-title">Photo not found</h2>
                <Link to="/" className="text-accent hover:underline">Return to Gallery</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            id: photo.id,
            title: photo.title,
            price: photo.price,
            image: photo.url
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

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
                    <button
                        onClick={() => setShowWallView(true)}
                        className="btn btn-secondary"
                        style={{
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1rem',
                            borderRadius: '2rem',
                            backdropFilter: 'blur(10px)',
                            background: 'rgba(0,0,0,0.6)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        <Eye size={18} />
                        View on Wall
                    </button>
                </div>

                {/* Details Section */}
                <div style={{ position: 'sticky', top: '100px', alignSelf: 'start' }}>
                    <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{photo.title}</h1>
                    <p className="text-accent" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>${photo.price}</p>

                    <div className="text-secondary mb-lg" style={{ lineHeight: 1.8 }}>
                        <p style={{ marginBottom: '1rem' }}>{photo.description}</p>
                        <p>Printed on premium archival paper with a matte finish. Signed by the artist.</p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                        <div className="flex-between text-secondary mb-md" style={{ marginBottom: '1rem' }}>
                            <span>Size</span>
                            <span className="text-primary">24" x 36"</span>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <button
                                onClick={handleAddToCart}
                                disabled={addedToCart}
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                            >
                                {addedToCart ? (
                                    <>
                                        <Check size={20} />
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={20} />
                                        Add to Cart
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setShowWallView(true)}
                                className="btn btn-secondary"
                                style={{ width: '100%', padding: '1rem' }}
                            >
                                <Eye size={20} />
                                View in Room
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showWallView && (
                <WallView
                    photoUrl={photo.url}
                    onClose={() => setShowWallView(false)}
                />
            )}
        </div>
    );
};

export default PhotoDetail;
