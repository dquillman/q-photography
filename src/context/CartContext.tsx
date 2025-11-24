import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PHOTOS } from '../data/photos_final';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    size: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number, size: string) => void;
    clearCart: () => void;
    total: number;
    count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
        setItems(current => {
            const existing = current.find(item => item.id === newItem.id && item.size === newItem.size);
            if (existing) {
                return current.map(item =>
                    item.id === newItem.id && item.size === newItem.size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...current, { ...newItem, quantity: 1 }];
        });

        // Decrement edition count
        const photo = PHOTOS.find(p => p.id === newItem.id);
        if (photo?.edition && photo.edition.remaining > 0) {
            photo.edition.remaining -= 1;
        }
    };

    const removeFromCart = (id: number, size: string) => {
        setItems(current => current.filter(item => !(item.id === id && item.size === size)));
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
