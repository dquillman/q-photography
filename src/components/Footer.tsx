import { Camera, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ borderTop: '1px solid var(--color-border)', padding: '4rem 0', marginTop: 'auto' }}>
            <div className="container">
                <div className="flex-between" style={{ flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <div className="flex-center gap-4" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
                            <Camera className="text-accent" size={24} />
                            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Q Photography</span>
                        </div>
                        <p className="text-secondary" style={{ maxWidth: '300px' }}>
                            Capturing the world's most beautiful moments and bringing them to your living space.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="#" className="btn btn-icon"><Instagram size={20} /></a>
                        <a href="#" className="btn btn-icon"><Twitter size={20} /></a>
                        <a href="#" className="btn btn-icon"><Facebook size={20} /></a>
                    </div>
                </div>

                <div className="text-center text-secondary" style={{ marginTop: '4rem', fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} Q Photography. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
