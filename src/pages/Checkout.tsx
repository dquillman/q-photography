import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, CheckCircle, Trash2, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { validateDiscountCode, calculateDiscount, type DiscountCode } from '../data/discounts';

const Checkout = () => {
    const [step, setStep] = useState<'cart' | 'details' | 'success'>('cart');
    const [promoCode, setPromoCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
    const [promoError, setPromoError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const { items, total, removeFromCart, clearCart } = useCart();

    const validateEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const applyPromoCode = () => {
        setPromoError('');
        const result = validateDiscountCode(promoCode, total);

        if (result.valid && result.discount) {
            setAppliedDiscount(result.discount);
            setPromoCode('');
        } else {
            setPromoError(result.error || 'Invalid code');
        }
    };

    const discountAmount = appliedDiscount ? calculateDiscount(appliedDiscount, total) : 0;
    const finalTotal = total - discountAmount;

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setStep('success');
        clearCart();
    };

    if (step === 'success') {
        return (
            <div className="container section flex-center" style={{ minHeight: '60vh', textAlign: 'center' }}>
                <div style={{ maxWidth: '500px' }}>
                    <div className="flex-center mb-lg">
                        <CheckCircle size={64} style={{ color: 'var(--color-success)' }} />
                    </div>
                    <h1 className="section-title">Order Confirmed!</h1>
                    <p className="text-secondary mb-lg">
                        Thank you for your purchase. A confirmation email has been sent to your inbox.
                        Your prints will be shipped within 3-5 business days.
                    </p>
                    <Link to="/" className="btn btn-primary">
                        Return to Gallery
                    </Link>
                </div>
            </div>
        );
    }

    if (items.length === 0 && step === 'cart') {
        return (
            <div className="container section text-center" style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2 className="section-title">Your cart is empty</h2>
                <p className="text-secondary mb-lg">Looks like you haven't added any prints yet.</p>
                <Link to="/" className="btn btn-primary">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container section">
            <Link to="/" className="btn btn-icon mb-lg" style={{ display: 'inline-flex', gap: '0.5rem', paddingLeft: 0 }}>
                <ArrowLeft size={20} />
                Continue Shopping
            </Link>

            <div className="grid-2-col">
                {/* Order Summary */}
                <div>
                    <h2 className="section-title">Order Summary</h2>
                    <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '0.5rem', padding: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {items.map((item) => (
                                <div key={item.id} className="flex-between" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <img src={item.image} alt={item.title} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px' }} />
                                        <div>
                                            <h3 className="card-title">{item.title}</h3>
                                            <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                                                Size: {item.size}" | Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span className="card-title">${(item.price * item.quantity).toFixed(2)}</span>
                                        <button onClick={() => removeFromCart(item.id, item.size)} className="text-secondary hover:text-accent">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Promo Code Section */}
                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                            <h3 className="card-title" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Tag size={20} />
                                Promo Code
                            </h3>
                            {appliedDiscount ? (
                                <div style={{
                                    padding: '1rem',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div className="card-title" style={{ color: 'var(--color-success)', marginBottom: '0.25rem' }}>
                                            {appliedDiscount.code} Applied!
                                        </div>
                                        <div className="text-secondary" style={{ fontSize: '0.875rem' }}>
                                            {appliedDiscount.type === 'percentage' ? `${appliedDiscount.value}% off` : `$${appliedDiscount.value} off`}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setAppliedDiscount(null)}
                                        className="text-secondary hover:text-primary"
                                        style={{ fontSize: '0.875rem' }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                                            placeholder="Enter code"
                                            className="form-input"
                                            style={{ flex: 1 }}
                                        />
                                        <button
                                            onClick={applyPromoCode}
                                            className="btn btn-secondary"
                                            disabled={!promoCode.trim()}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {promoError && (
                                        <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                            {promoError}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                            <div className="flex-between text-secondary mb-md">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            {appliedDiscount && discountAmount > 0 && (
                                <div className="flex-between mb-md" style={{ color: 'var(--color-success)' }}>
                                    <span>Discount ({appliedDiscount.code})</span>
                                    <span>-${discountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex-between text-secondary mb-md">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="flex-between card-title text-primary" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
                                <span>Total</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Checkout Form */}
                <div>
                    <h2 className="section-title">Payment Details</h2>

                    <div className="form-group mb-lg">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (emailError) setEmailError('');
                            }}
                            required
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    <button
                        onClick={() => {
                            if (!validateEmail(email)) {
                                setEmailError('Please enter a valid email address to receive your confirmation.');
                                return;
                            }
                            setStep('success');
                            clearCart();
                        }}
                        className="btn"
                        style={{
                            width: '100%',
                            backgroundColor: '#fff',
                            color: '#000',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            border: '1px solid #e2e8f0'
                        }}
                    >
                        <svg viewBox="0 0 24 24" className="w-6 h-6" style={{ width: '24px', height: '24px' }} fill="currentColor">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                        </svg>
                        Pay with Google
                    </button>

                    <div style={{ position: 'relative', margin: '2rem 0', textAlign: 'center' }}>
                        <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '100%', borderTop: '1px solid var(--color-border)' }}></div>
                        </div>
                        <span style={{ position: 'relative', backgroundColor: 'var(--color-background)', padding: '0 1rem', color: 'var(--color-secondary)', fontSize: '0.875rem' }}>
                            Or pay with card
                        </span>
                    </div>

                    <form className="space-y-4" onSubmit={handlePayment}>


                        <div className="form-group">
                            <label className="form-label">Card Information</label>
                            <div style={{ position: 'relative' }}>
                                <input type="text" className="form-input" style={{ paddingLeft: '2.5rem' }} placeholder="0000 0000 0000 0000" required />
                                <CreditCard className="text-secondary" size={18} style={{ position: 'absolute', left: '0.75rem', top: '0.75rem' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label">Expiry Date</label>
                                <input type="text" className="form-input" placeholder="MM/YY" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">CVC</label>
                                <input type="text" className="form-input" placeholder="123" required />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                            Pay ${total}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
