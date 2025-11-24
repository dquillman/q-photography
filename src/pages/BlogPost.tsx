import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';

const BlogPost = () => {
    const { slug } = useParams();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="container section text-center">
                <h2 className="section-title">Post not found</h2>
                <Link to="/blog" className="text-accent hover:underline">Return to Blog</Link>
            </div>
        );
    }

    // Get related posts (same tags, excluding current)
    const relatedPosts = BLOG_POSTS
        .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
        .slice(0, 2);

    return (
        <div className="container section">
            <Link to="/blog" className="btn btn-icon mb-lg" style={{ display: 'inline-flex', gap: '0.5rem', paddingLeft: 0 }}>
                <ArrowLeft size={20} />
                Back to Blog
            </Link>

            {/* Cover Image */}
            <div style={{
                width: '100%',
                height: '400px',
                borderRadius: '1rem',
                overflow: 'hidden',
                marginBottom: '2rem'
            }}>
                <img
                    src={post.coverImage}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            {/* Post Content */}
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    {post.title}
                </h1>

                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    marginBottom: '2rem',
                    paddingBottom: '2rem',
                    borderBottom: '1px solid var(--color-border)',
                    color: 'var(--color-secondary)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={18} />
                        {post.publishedAt.toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={18} />
                        {post.author}
                    </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '0.5rem 1rem',
                                background: 'rgba(59, 130, 246, 0.1)',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                borderRadius: '1rem',
                                fontSize: '0.875rem',
                                color: 'var(--color-accent)'
                            }}
                        >
                            <Tag size={14} />
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Content */}
                <div
                    className="blog-content"
                    style={{
                        lineHeight: 1.8,
                        color: 'var(--color-secondary)',
                        whiteSpace: 'pre-line'
                    }}
                >
                    {post.content}
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                        <h2 className="section-title" style={{ marginBottom: '2rem' }}>Related Posts</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.slug}`}
                                    className="photo-card"
                                >
                                    <div className="photo-card-image" style={{ aspectRatio: '2/1' }}>
                                        <img
                                            src={relatedPost.coverImage}
                                            alt={relatedPost.title}
                                            loading="lazy"
                                        />
                                        <div className="photo-card-overlay" />
                                    </div>
                                    <div style={{ padding: '1rem' }}>
                                        <h3 className="card-title">{relatedPost.title}</h3>
                                        <p className="text-secondary" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                            {relatedPost.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPost;
