import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="container section">
            {/* Hero Section */}
            <div className="about-hero" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    Capturing Moments, <br />
                    <span className="text-gradient">Creating Art</span>
                </h1>
                <p className="text-secondary" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
                    Transforming fleeting moments into timeless visual stories
                </p>
            </div>

            {/* Bio Section */}
            <div className="grid-2-col mb-xl">
                <div>
                    <h2 className="section-title">My Journey</h2>
                    <div className="text-secondary" style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Photography has been my passion for over a decade. What started as a hobby with a borrowed camera
                            has evolved into a lifelong pursuit of capturing the extraordinary in the ordinary.
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            My work focuses on landscape and urban photography, seeking out the interplay of light, shadow,
                            and atmosphere that makes each moment unique. I believe that great photography isn't just about
                            technical perfection—it's about evoking emotion and telling a story.
                        </p>
                        <p>
                            Each print in my collection is carefully curated and professionally produced on premium archival
                            paper, ensuring that the beauty you see today will last for generations to come.
                        </p>
                    </div>
                </div>
                <div style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                    borderRadius: '1rem',
                    padding: '3rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Philosophy</h3>
                    <p className="text-secondary" style={{ lineHeight: 1.8, fontSize: '1.1rem', fontStyle: 'italic' }}>
                        "I seek to capture not just what I see, but what I feel. Every photograph is an invitation to
                        pause, to observe, and to find beauty in the world around us. My goal is to create images that
                        don't just decorate a space, but transform it—bringing a sense of calm, wonder, and connection
                        to nature and the urban landscape."
                    </p>
                </div>
            </div>

            {/* Credentials Section */}
            <div className="mb-xl">
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    Recognition & Experience
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    <div style={{
                        background: 'var(--color-surface)',
                        padding: '2rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--color-border)'
                    }}>
                        <div style={{
                            color: 'var(--color-accent)',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem'
                        }}>
                            2023
                        </div>
                        <h3 className="card-title">Featured Exhibition</h3>
                        <p className="text-secondary">Modern Landscapes Gallery</p>
                    </div>
                    <div style={{
                        background: 'var(--color-surface)',
                        padding: '2rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--color-border)'
                    }}>
                        <div style={{
                            color: 'var(--color-accent)',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem'
                        }}>
                            2022
                        </div>
                        <h3 className="card-title">Photography Award</h3>
                        <p className="text-secondary">International Photo Contest - Honorable Mention</p>
                    </div>
                    <div style={{
                        background: 'var(--color-surface)',
                        padding: '2rem',
                        borderRadius: '0.75rem',
                        border: '1px solid var(--color-border)'
                    }}>
                        <div style={{
                            color: 'var(--color-accent)',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            marginBottom: '0.5rem'
                        }}>
                            2020-Present
                        </div>
                        <h3 className="card-title">Professional Practice</h3>
                        <p className="text-secondary">Full-time Fine Art Photographer</p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <h2 className="section-title" style={{ marginBottom: '1rem' }}>
                    Ready to Find Your Perfect Print?
                </h2>
                <p className="text-secondary" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
                    Explore the full collection and bring a piece of art into your space
                </p>
                <Link to="/" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    View Gallery
                </Link>
            </div>
        </div>
    );
};

export default About;
