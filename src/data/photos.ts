export interface Photo {
    id: number;
    title: string;
    url: string;
    price: number;
    description: string;
}

export const PHOTOS: Photo[] = [
    {
        "id": 1,
        "title": "Mountain Mist",
        "url": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
        "price": 120,
        "description": "A serene capture of morning mist rolling over mountain peaks."
    },
    {
        "id": 2,
        "title": "Urban Solitude",
        "url": "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80",
        "price": 95,
        "description": "The quiet moments in a bustling city, captured in high contrast."
    },
    {
        "id": 4,
        "title": "Autumn Gold",
        "url": "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=800&q=80",
        "price": 110,
        "description": "Vibrant fall colors illuminating a forest path."
    },
    {
        "id": 5,
        "title": "Desert Silence",
        "url": "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=800&q=80",
        "price": 130,
        "description": "The stark beauty of the desert landscape at sunset."
    },
    {
        "id": 6,
        "title": "City Lights",
        "url": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
        "price": 140,
        "description": "A long exposure capturing the energy of night traffic."
    },
    {
        "id": 1763929353715,
        "title": "Test Photo",
        "url": "/photos/IMG_9686-HDR.jpeg",
        "price": 150,
        "description": "Test description"
    }
];
