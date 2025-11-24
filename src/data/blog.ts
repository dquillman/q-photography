export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: string;
    publishedAt: Date;
    tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "Capturing the Perfect Landscape",
        slug: "capturing-perfect-landscape",
        excerpt: "Learn the essential techniques and tips for creating stunning landscape photographs that tell a story.",
        content: `Landscape photography is more than just pointing your camera at a beautiful scene. It's about capturing the essence of a place, the mood of a moment, and the story of the land.

## The Golden Hours

The best landscape photos are often taken during the golden hours - the first hour after sunrise and the last hour before sunset. The soft, warm light during these times adds depth and dimension to your images.

## Composition Techniques

1. **Rule of Thirds**: Place your horizon on the upper or lower third line, not in the center
2. **Leading Lines**: Use natural lines like rivers, roads, or fences to guide the viewer's eye
3. **Foreground Interest**: Include interesting elements in the foreground to add depth

## Essential Gear

- Wide-angle lens (16-35mm)
- Sturdy tripod
- Neutral density filters
- Remote shutter release

Remember, the best camera is the one you have with you. Don't let gear limitations stop you from capturing beautiful moments.`,
        coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
        author: "Q Photography",
        publishedAt: new Date('2024-01-15'),
        tags: ['landscape', 'tips', 'techniques']
    },
    {
        id: 2,
        title: "The Art of Black and White Photography",
        slug: "art-of-black-and-white",
        excerpt: "Discover why black and white photography remains timeless and how to master this classic art form.",
        content: `Black and white photography strips away the distraction of color, allowing the viewer to focus on composition, texture, light, and emotion.

## Why Shoot in Black and White?

Black and white photography forces you to see the world differently. Without color, you must rely on:

- **Contrast**: The interplay between light and dark
- **Texture**: Surface details become more prominent
- **Shape and Form**: Geometric elements stand out
- **Emotion**: Mood becomes more powerful

## Converting to Black and White

Don't just desaturate! Proper black and white conversion involves:

1. Adjusting individual color channels
2. Enhancing contrast
3. Dodging and burning specific areas
4. Fine-tuning highlights and shadows

## Best Subjects

- Architecture with strong lines
- Portraits with dramatic lighting
- Street photography
- Minimalist landscapes
- High-contrast scenes

The key is to pre-visualize your scene in black and white before you shoot.`,
        coverImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=600&fit=crop",
        author: "Q Photography",
        publishedAt: new Date('2024-01-22'),
        tags: ['black and white', 'techniques', 'editing']
    },
    {
        id: 3,
        title: "Behind the Lens: My Photography Journey",
        slug: "photography-journey",
        excerpt: "A personal reflection on my path from hobbyist to professional photographer and the lessons learned along the way.",
        content: `Every photographer has a story. Mine began with a simple point-and-shoot camera and a curiosity about capturing moments.

## The Beginning

I started photography as a way to document my travels. What began as snapshots quickly evolved into a passion for composition, light, and storytelling.

## The Turning Point

The moment I realized photography was more than a hobby was when someone asked to purchase one of my prints. That validation sparked something - maybe I could share my vision with others.

## Lessons Learned

**1. Patience is Everything**
The best shots often require waiting for the perfect light, the right moment, or the ideal conditions.

**2. Gear Doesn't Make the Photographer**
I've seen incredible photos taken with smartphones and mediocre ones with expensive equipment. Vision matters more than gear.

**3. Never Stop Learning**
Every shoot teaches something new. Every mistake is an opportunity to improve.

**4. Find Your Style**
Don't try to copy others. Develop your own unique perspective and voice.

## Looking Forward

Photography continues to challenge and inspire me. Each new location, each changing season, each unique moment offers endless possibilities.

Thank you for being part of this journey.`,
        coverImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=600&fit=crop",
        author: "Q Photography",
        publishedAt: new Date('2024-02-01'),
        tags: ['personal', 'journey', 'inspiration']
    }
];
