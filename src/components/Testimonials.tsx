import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

const Testimonials = () => {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h2 className="section-title text-center mb-xl">What Our Customers Say</h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {TESTIMONIALS.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="testimonial-card"
                    >
                        {/* Star Rating */}
                        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    size={18}
                                    fill={index < testimonial.rating ? '#fbbf24' : 'none'}
                                    stroke={index < testimonial.rating ? '#fbbf24' : 'var(--color-border)'}
                                />
                            ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-secondary" style={{
                            lineHeight: 1.8,
                            marginBottom: '1.5rem',
                            fontStyle: 'italic'
                        }}>
                            "{testimonial.text}"
                        </p>

                        {/* Author Info */}
                        <div style={{
                            paddingTop: '1rem',
                            borderTop: '1px solid var(--color-border)'
                        }}>
                            <div className="card-title" style={{ marginBottom: '0.25rem' }}>
                                {testimonial.name}
                            </div>
                            {testimonial.location && (
                                <div className="text-secondary" style={{ fontSize: '0.875rem' }}>
                                    {testimonial.location}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
