import { Link } from 'react-router-dom';
import { PHOTOS } from '../data/photos';

const Home = () => {
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

            <div className="grid-gallery">
                {PHOTOS.map((photo) => (
                    <Link key={photo.id} to={`/photo/${photo.id}`} className="photo-card">
                        <div className="photo-card-image">
                            <img
                                src={photo.url}
                                alt={photo.title}
                                loading="lazy"
                            />
                            <div className="photo-card-overlay" />
                        </div>
                        <div className="photo-info">
                            <div>
                                <h3 className="card-title text-primary">{photo.title}</h3>
                                <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Fine Art Print</p>
                            </div>
                            <span className="card-title">${photo.price}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
