import { Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
    url: string;
    title: string;
    imageUrl: string;
}

const ShareButtons = ({ url, title, imageUrl }: ShareButtonsProps) => {
    const [copied, setCopied] = useState(false);

    const shareUrl = encodeURIComponent(url);
    const shareTitle = encodeURIComponent(title);
    const shareImage = encodeURIComponent(imageUrl);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${shareImage}&description=${shareTitle}`
    };

    const handleShare = (platform: keyof typeof shareLinks) => {
        window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    };

    return (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="text-secondary" style={{ fontSize: '0.875rem', marginRight: '0.5rem' }}>
                Share:
            </span>

            <button
                onClick={() => handleShare('facebook')}
                className="btn-icon"
                style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    padding: '0.5rem'
                }}
                aria-label="Share on Facebook"
            >
                <Facebook size={18} />
            </button>

            <button
                onClick={() => handleShare('twitter')}
                className="btn-icon"
                style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    padding: '0.5rem'
                }}
                aria-label="Share on Twitter"
            >
                <Twitter size={18} />
            </button>

            <button
                onClick={() => handleShare('pinterest')}
                className="btn-icon"
                style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    padding: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600
                }}
                aria-label="Share on Pinterest"
            >
                P
            </button>

            <button
                onClick={handleCopyLink}
                className="btn-icon"
                style={{
                    background: copied ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-surface)',
                    border: `1px solid ${copied ? 'var(--color-success)' : 'var(--color-border)'}`,
                    padding: '0.5rem',
                    color: copied ? 'var(--color-success)' : 'inherit'
                }}
                aria-label="Copy link"
            >
                {copied ? <Check size={18} /> : <LinkIcon size={18} />}
            </button>
        </div>
    );
};

export default ShareButtons;
