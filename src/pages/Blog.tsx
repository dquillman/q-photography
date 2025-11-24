import { Link } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';

const Blog = () => {
    const sortedPosts = [...BLOG_POSTS].sort((a, b) =>
        b.publishedAt.getTime() - a.publishedAt.getTime()
    );

    return (
        <div className="container section">
            <h1 className="section-title text-center mb-xl">Photography Journal</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {sortedPosts.map((post) => (
                    <Link
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        className="photo-card"
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="photo-card-image" style={{ aspectRatio: '2/1' }}>
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                loading="lazy"
                            />
                            <div className="photo-card-overlay" />
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <h2 className="card-title" style={{ marginBottom: '0.75rem' }}>
                                {post.title}
                            </h2>

                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginBottom: '1rem',
                                fontSize: '0.875rem',
                                color: 'var(--color-secondary)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={16} />
                                    {post.publishedAt.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <User size={16} />
                                    {post.author}
                                </div>
                            </div>

                            <p className="text-secondary" style={{
                                lineHeight: 1.6,
                                marginBottom: '1rem'
                            }}>
                                {post.excerpt}
                            </p>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            padding: '0.25rem 0.75rem',
                                            background: 'rgba(59, 130, 246, 0.1)',
                                            border: '1px solid rgba(59, 130, 246, 0.3)',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            color: 'var(--color-accent)'
                                        }}
                                    >
                                        <Tag size={12} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blog;
