// ⚠️ WARNING: DO NOT DELETE THESE INTERFACES ⚠️
// Use the Admin page at /admin to add photos instead of editing this file manually

export interface PrintSize {
    size: string;
    price: number;
    description?: string;
}

export interface Photo {
    id: number;
    title: string;
    url: string;
    price: number;
    sizes: PrintSize[];        // REQUIRED
    edition?: {                // OPTIONAL
        total: number;
        remaining: number;
    };
    description: string;
    category?: string;         // REQUIRED
    isBW?: boolean;           // REQUIRED
}

export const PHOTOS: Photo[] = [
    {
        "id": 1,
        "title": "Mountain Mist",
        "url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        "price": 95,
        "sizes": [
            {
                "size": "8x10",
                "price": 95,
                "description": "Perfect for desks & shelves"
            },
            {
                "size": "16x20",
                "price": 152,
                "description": "Statement piece"
            },
            {
                "size": "24x36",
                "price": 266,
                "description": "Gallery quality"
            },
            {
                "size": "30x40",
                "price": 371,
                "description": "Premium large format"
            }
        ],
        "edition": {
            "total": 50,
            "remaining": 12
        },
        "description": "A serene capture of morning mist rolling over mountain peaks.",
        "category": "Landscape",
        "isBW": false
    },
    {
        "id": 2,
        "title": "Urban Solitude",
        "url": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80",
        "price": 95,
        "sizes": [
            {
                "size": "8x10",
                "price": 95,
                "description": "Perfect for desks & shelves"
            },
            {
                "size": "16x20",
                "price": 152,
                "description": "Statement piece"
            },
            {
                "size": "24x36",
                "price": 266,
                "description": "Gallery quality"
            },
            {
                "size": "30x40",
                "price": 371,
                "description": "Premium large format"
            }
        ],
        "edition": {
            "total": 100,
            "remaining": 45
        },
        "description": "The quiet moments in a bustling city, captured in high contrast.",
        "category": "Urban",
        "isBW": false
    },
    {
        "id": 4,
        "title": "Autumn Gold",
        "url": "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=800&q=80",
        "price": 110,
        "sizes": [
            {
                "size": "8x10",
                "price": 110,
                "description": "Perfect for desks & shelves"
            },
            {
                "size": "16x20",
                "price": 165,
                "description": "Statement piece"
            },
            {
                "size": "24x36",
                "price": 275,
                "description": "Gallery quality"
            },
            {
                "size": "30x40",
                "price": 375,
                "description": "Premium large format"
            }
        ],
        "edition": {
            "total": 25,
            "remaining": 3
        },
        "description": "Vibrant fall colors illuminating a forest path.",
        "category": "Nature"
    },
    {
        "id": 5,
        "title": "Desert Silence",
        "url": "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=800&q=80",
        "price": 130,
        "sizes": [
            {
                "size": "8x10",
                "price": 130,
                "description": "Perfect for desks & shelves"
            },
            {
                "size": "16x20",
                "price": 195,
                "description": "Statement piece"
            },
            {
                "size": "24x36",
                "price": 325,
                "description": "Gallery quality"
            },
            {
                "size": "30x40",
                "price": 425,
                "description": "Premium large format"
            }
        ],
        "description": "The stark beauty of the desert landscape at sunset.",
        "category": "Landscape"
    },
    {
        "id": 6,
        "title": "Ocean Mist",
        "url": "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=800&q=80",
        "price": 105,
        "sizes": [
            {
                "size": "8x10",
                "price": 105,
                "description": "Perfect for desks & shelves"
            },
            {
                "size": "16x20",
                "price": 160,
                "description": "Statement piece"
            },
            {
                "size": "24x36",
                "price": 265,
                "description": "Gallery quality"
            },
            {
                "size": "30x40",
                "price": 365,
                "description": "Premium large format"
            }
        ],
        "description": "Waves crashing against rocky shores in the early morning light.",
        "category": "Seascape"
    },
    {
        "id": 7,
        "title": "City Lights",
        "url": "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80",
        "price": 120,
        "sizes": [
            {
                "size": "8x10",
                "price": 120,
                "description": "Perfect for desks & shelves"
            },
            {
                "size": "16x20",
                "price": 192,
                "description": "Statement piece"
            },
            {
                "size": "24x36",
                "price": 336,
                "description": "Gallery quality"
            },
            {
                "size": "30x40",
                "price": 468,
                "description": "Premium large format"
            }
        ],
        "description": "The vibrant energy of the city captured at night.",
        "category": "Urban",
        "isBW": false
    },
    {
        "id": 8,
        "title": "Forest Path",
        "url": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
        "price": 100,
        "sizes": [
            {
                "size": "8x10",
                "price": 100,
                "description": "Perfect for desks & shelves"
            },
            {
                "size": "16x20",
                "price": 155,
                "description": "Statement piece"
            },
            {
                "size": "24x36",
                "price": 260,
                "description": "Gallery quality"
            },
            {
                "size": "30x40",
                "price": 360,
                "description": "Premium large format"
            }
        ],
        "description": "A peaceful walk through an ancient forest.",
        "category": "Nature"
    },
    {
        "id": 1763981522979,
        "title": "y",
        "url": "/photos/327123340_521553053158992_3963580687869652572_n.jpg",
        "price": 400,
        "sizes": [
            {
                "size": "8x10",
                "price": 400,
                "description": "Perfect for desks & shelves"
            },
            {
                "size": "16x20",
                "price": 640,
                "description": "Statement piece"
            },
            {
                "size": "24x36",
                "price": 1120,
                "description": "Gallery quality"
            },
            {
                "size": "30x40",
                "price": 1560,
                "description": "Premium large format"
            }
        ],
        "description": "gg",
        "category": "Landscape",
        "isBW": true
    },
    {
        "id": 1763981927939,
        "title": "oo",
        "url": "/photos/327123340_521553053158992_3963580687869652572_n.jpg",
        "price": 50,
        "sizes": [
            {
                "size": "8x10",
                "price": 50,
                "description": "Perfect for desks & shelves"
            },
            {
                "size": "16x20",
                "price": 80,
                "description": "Statement piece"
            },
            {
                "size": "24x36",
                "price": 140,
                "description": "Gallery quality"
            },
            {
                "size": "30x40",
                "price": 195,
                "description": "Premium large format"
            }
        ],
        "description": "ooo",
        "category": "Landscape",
        "isBW": true
    }
];
