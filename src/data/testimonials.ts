export interface Testimonial {
    id: number;
    name: string;
    location?: string;
    rating: number; // 1-5
    text: string;
    photoUrl?: string;
    date: Date;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        location: "Seattle, WA",
        rating: 5,
        text: "Absolutely stunning prints! The quality exceeded my expectations. I ordered the 24x36 landscape print and it's now the centerpiece of my living room.",
        date: new Date('2024-01-10')
    },
    {
        id: 2,
        name: "Michael Chen",
        location: "San Francisco, CA",
        rating: 5,
        text: "Beautiful photography and excellent customer service. The prints arrived perfectly packaged and the colors are vibrant. Highly recommend!",
        date: new Date('2024-01-15')
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        location: "Portland, OR",
        rating: 5,
        text: "I've purchased three prints so far and each one is a work of art. The attention to detail and print quality is outstanding.",
        date: new Date('2024-01-20')
    },
    {
        id: 4,
        name: "David Thompson",
        location: "Denver, CO",
        rating: 5,
        text: "These prints transformed my office space. Professional quality at reasonable prices. Will definitely be ordering more!",
        date: new Date('2024-01-25')
    }
];
