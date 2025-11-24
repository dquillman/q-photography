import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Eye, Maximize } from 'lucide-react';
import { Photo } from '../data/photos_final';


interface LightboxProps {
    photo: Photo;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
    onViewInRoom: () => void;
}

const Lightbox = ({ photo, onClose, onNext, onPrev, hasNext, hasPrev, onViewInRoom }: LightboxProps) => {
    console.log('DEBUG: Lightbox render');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && hasPrev) onPrev();
            if (e.key === 'ArrowRight' && hasNext) onNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onClose, onNext, onPrev, hasNext, hasPrev]);



    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="lightbox-close" onClick={onClose} aria-label="Close">
                    <X size={24} />
                </button>

                {/* Navigation Arrows */}
                {hasPrev && (
                    <button className="lightbox-nav lightbox-nav-prev" onClick={onPrev} aria-label="Previous">
                        <ChevronLeft size={32} />
                    </button>
                )}
                {hasNext && (
                    <button className="lightbox-nav lightbox-nav-next" onClick={onNext} aria-label="Next">
                        <ChevronRight size={32} />
                    </button>
                )}

                {/* Image */}
                <div className="lightbox-image-container">
                    <img src={photo.url} alt={photo.title} className="lightbox-image" />
                </div>

                {/* Details Panel */}
                <div className="lightbox-details">
                    <div className="lightbox-info">
                        <h2 className="lightbox-title">{photo.title}</h2>
                        <p className="lightbox-price">${photo.price}</p>
                        {photo.category && (
                            <span className="lightbox-category">{photo.category}</span>
                        )}
                        {photo.description && (
                            <p className="lightbox-description">{photo.description}</p>
                        )}
                    </div>
                    <div className="lightbox-actions">
                        <Link to={`/photo/${photo.id}`} className="btn btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                            <ShoppingBag size={18} />
                            Select Size & Buy
                        </Link>
                        <button onClick={onViewInRoom} className="btn btn-secondary">
                            <Eye size={18} />
                            View in Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lightbox;
