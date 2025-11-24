export interface DiscountCode {
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    minPurchase?: number;
    expiresAt?: Date;
    active: boolean;
}

export const DISCOUNT_CODES: DiscountCode[] = [
    {
        code: 'WELCOME10',
        type: 'percentage',
        value: 10,
        active: true
    },
    {
        code: 'SAVE20',
        type: 'fixed',
        value: 20,
        minPurchase: 100,
        active: true
    },
    {
        code: 'HOLIDAY25',
        type: 'percentage',
        value: 25,
        minPurchase: 150,
        active: true
    }
];

export const validateDiscountCode = (code: string, subtotal: number): { valid: boolean; discount?: DiscountCode; error?: string } => {
    const discount = DISCOUNT_CODES.find(d =>
        d.code.toUpperCase() === code.toUpperCase() &&
        d.active
    );

    if (!discount) {
        return { valid: false, error: 'Invalid discount code' };
    }

    // Check expiration
    if (discount.expiresAt && new Date() > discount.expiresAt) {
        return { valid: false, error: 'This code has expired' };
    }

    // Check minimum purchase
    if (discount.minPurchase && subtotal < discount.minPurchase) {
        return { valid: false, error: `Minimum purchase of $${discount.minPurchase} required` };
    }

    return { valid: true, discount };
};

export const calculateDiscount = (discount: DiscountCode, subtotal: number): number => {
    if (discount.type === 'percentage') {
        return subtotal * (discount.value / 100);
    } else {
        return discount.value;
    }
};
