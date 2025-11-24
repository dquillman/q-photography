import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address');
            return;
        }

        // Check if already subscribed
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        if (subscribers.includes(email.toLowerCase())) {
            setStatus('error');
            setMessage('This email is already subscribed');
            return;
        }

        // Add to subscribers
        subscribers.push(email.toLowerCase());
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

        setStatus('success');
        setMessage('Thanks for subscribing! Check your inbox for updates.');
        setEmail('');

        // Reset after 5 seconds
        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 5000);
    };

    return (
        <div className="newsletter-section">
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                        Stay Updated
                    </h3>
                    <p className="text-secondary">
                        Subscribe to our newsletter for new prints, photography tips, and exclusive offers.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
                            <Mail
                                size={20}
                                style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-secondary)'
                                }}
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="form-input"
                                style={{ paddingLeft: '3rem' }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ minWidth: '120px' }}
                        >
                            Subscribe
                        </button>
                    </div>
                </form>

                {status === 'success' && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '1rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '0.5rem',
                        color: 'var(--color-success)'
                    }}>
                        <Check size={20} />
                        <span>{message}</span>
                    </div>
                )}

                {status === 'error' && (
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '0.5rem',
                        color: '#ef4444'
                    }}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Newsletter;
