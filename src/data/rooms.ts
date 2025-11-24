export interface Room {
    id: string;
    name: string;
    color: string;
    image: string;
    placement: {
        top: string;
        left: string;
        width: string;
        transform?: string;
        boxShadow?: string;
    };
    isCustom?: boolean;
}

export const ROOMS: Room[] = [
    {
        "id": "living",
        "name": "Living Room",
        "color": "#e5e5e5",
        "image": "/src/assets/rooms/living_room.png",
        "placement": {
            "top": "47%",
            "left": "47%",
            "width": "17%",
            "transform": "none",
            "boxShadow": "0 20px 50px -12px rgba(0, 0, 0, 0.5)"
        }
    },
    {
        "id": "fireplace",
        "name": "Fireplace",
        "color": "#3a2a2a",
        "image": "/src/assets/rooms/fireplace.png",
        "placement": {
            "top": "30%",
            "left": "50%",
            "width": "13%",
            "transform": "perspective(1000px) rotateY(4deg)",
            "boxShadow": "0 20px 50px -12px rgba(0, 0, 0, 0.5)"
        }
    },
    {
        "id": "bedroom",
        "name": "Bedroom",
        "color": "#f5f5f5",
        "image": "/src/assets/rooms/modern_bedroom.png",
        "placement": {
            "top": "26%",
            "left": "38%",
            "width": "12%",
            "transform": "perspective(1000px) rotateY(10deg) rotateX(-2deg)",
            "boxShadow": "0 20px 50px -12px rgba(0, 0, 0, 0.5)"
        }
    },
    {
        "id": "hallway",
        "name": "Hallway",
        "color": "#dccfc6",
        "image": "/src/assets/rooms/minimalist_hallway.png",
        "placement": {
            "top": "38%",
            "left": "72%",
            "width": "17%",
            "transform": "perspective(800px) rotateY(-54deg) skewY(2deg)",
            "boxShadow": "15px 20px 50px -12px rgba(0, 0, 0, 0.7)"
        }
    },
    {
        "id": "loft",
        "name": "Loft",
        "color": "#2a2a2a",
        "image": "/src/assets/rooms/industrial_loft.png",
        "placement": {
            "top": "42%",
            "left": "53%",
            "width": "13%",
            "transform": "perspective(1200px) rotateY(4deg)",
            "boxShadow": "-10px 20px 50px -12px rgba(0, 0, 0, 0.5)"
        }
    },
    {
        "id": "nook",
        "name": "Nook",
        "color": "#e5e5e5",
        "image": "/src/assets/rooms/reading_nook.png",
        "placement": {
            "top": "30%",
            "left": "65%",
            "width": "25%",
            "transform": "perspective(1000px) rotateY(-15deg) rotateX(2deg)",
            "boxShadow": "8px 20px 50px -12px rgba(0, 0, 0, 0.5)"
        }
    },
    {
        "id": "dining",
        "name": "Dining",
        "color": "#f0f0f0",
        "image": "/src/assets/rooms/dining_room.png",
        "placement": {
            "top": "35%",
            "left": "53%",
            "width": "14%",
            "transform": "perspective(1500px) rotateX(2deg)",
            "boxShadow": "0 20px 50px -12px rgba(0, 0, 0, 0.5)"
        }
    }
];
