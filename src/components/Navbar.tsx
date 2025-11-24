import { Link } from 'react-router-dom';
import { ShoppingBag, Camera } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { APP_VERSION } from '../version';

const Navbar = () => {
    const { count } = useCart();

    return (
        <nav style={{ borderBottom: '1px solid var(--color-border)', padding: '1.5rem 0' }}>
            <div className="container flex-between">
                <Link to="/" className="flex-center gap-4" style={{ gap: '0.5rem' }}>
                    <Camera className="text-accent" size={24} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>Q Photography</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', opacity: 0.5, letterSpacing: '0.1em' }}>v{APP_VERSION}</span>
                    </div>
                </Link>

                <div className="flex-center" style={{ gap: '2rem' }}>
                    <Link to="/admin" className="text-secondary hover:text-primary transition-colors">Admin</Link>
                    <Link to="/checkout" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                        <ShoppingBag size={18} />
                        <span>Cart ({count})</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
