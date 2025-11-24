import { AlertCircle } from 'lucide-react';

interface EditionBadgeProps {
    total: number;
    remaining: number;
}

const EditionBadge = ({ total, remaining }: EditionBadgeProps) => {
    const isLowStock = remaining < 10;
    const isSoldOut = remaining === 0;

    if (isSoldOut) {
        return (
            <div className="edition-badge sold-out" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'rgba(107, 114, 128, 0.1)',
                border: '1px solid rgba(107, 114, 128, 0.3)',
                borderRadius: '2rem',
                fontSize: '0.875rem',
                color: '#6b7280'
            }}>
                <AlertCircle size={16} />
                Sold Out
            </div>
        );
    }

    return (
        <div className={`edition-badge ${isLowStock ? 'low-stock' : ''}`} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: isLowStock ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${isLowStock ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: '2rem',
            fontSize: '0.875rem',
            color: isLowStock ? '#f59e0b' : '#ef4444',
            fontWeight: 500
        }}>
            <AlertCircle size={16} />
            Limited Edition: {remaining}/{total} remaining
            {isLowStock && !isSoldOut && ' - Low Stock!'}
        </div>
    );
};

export default EditionBadge;
