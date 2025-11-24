import { useState, useEffect } from 'react';
import { Save, Loader, Wand2, AlertCircle, Trash2, Settings, Pencil, X } from 'lucide-react';
import { PHOTOS, Photo } from '../data/photos_final';
import WallView from '../components/WallView';

const Admin = () => {
    const [apiKey, setApiKey] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Landscape'); // Default category
    const [isBW, setIsBW] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [photos, setPhotos] = useState<Photo[]>(PHOTOS);
    const [showRoomEditor, setShowRoomEditor] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) setApiKey(savedKey);

        // Fetch latest photos from server to ensure sync
        fetch('/api/get-photos')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setPhotos(data);
                }
            })
            .catch(err => console.error('Failed to fetch photos:', err));
    }, []);

    const saveApiKey = () => {
        localStorage.setItem('gemini_api_key', apiKey);
        alert('API Key saved!');
    };

    const generateDescription = async () => {
        if (!apiKey) {
            setError('Please enter your Gemini API Key first.');
            return;
        }
        if (!imageUrl) {
            setError('Please enter an image URL.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // 1. Fetch image and convert to base64
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error('Failed to fetch image. Check CORS or URL.');
            const blob = await response.blob();

            const reader = new FileReader();
            reader.readAsDataURL(blob);

            reader.onloadend = async () => {
                const base64data = (reader.result as string).split(',')[1];
                const mimeType = response.headers.get('content-type') || 'image/jpeg';

                // 2. Call Gemini API
                const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: `Analyze this image and write a sophisticated, SEO-friendly description suitable for a premium photography portfolio. Focus on lighting, composition, and mood. The title of the photo is "${title}". Keep it under 2 sentences.` },
                                { inline_data: { mime_type: mimeType, data: base64data } }
                            ]
                        }]
                    })
                });

                const data = await apiResponse.json();

                if (data.error) {
                    throw new Error(data.error.message);
                }

                const generatedText = data.candidates[0].content.parts[0].text;
                setDescription(generatedText);
                setLoading(false);
            };

        } catch (err: any) {
            setError(err.message || 'Something went wrong');
            setLoading(false);
        }
    };

    const handleEdit = (photo: Photo) => {
        setEditingId(photo.id);
        setTitle(photo.title);
        setPrice(photo.price.toString());
        setDescription(photo.description);
        setCategory(photo.category || 'Landscape');
        setIsBW(photo.isBW || false);
        setImageUrl(photo.url);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setTitle('');
        setPrice('');
        setDescription('');
        setCategory('Landscape');
        setIsBW(false);
        setImageUrl('');
    };

    const saveToSite = async () => {
        if (!title || !imageUrl || !price) {
            setError('Please fill in all fields.');
            return;
        }

        if (imageUrl.startsWith('blob:')) {
            setError('Please wait for the image to finish uploading.');
            return;
        }

        setLoading(true);
        try {
            let updatedPhotos;

            if (editingId) {
                // Update existing photo
                const basePrice = Number(price);
                updatedPhotos = photos.map(p =>
                    p.id === editingId
                        ? {
                            ...p,
                            title,
                            url: imageUrl,
                            price: basePrice,
                            description,
                            category,
                            isBW,
                            sizes: [
                                { size: "8x10", price: basePrice, description: "Perfect for desks & shelves" },
                                { size: "16x20", price: Math.round(basePrice * 1.6), description: "Statement piece" },
                                { size: "24x36", price: Math.round(basePrice * 2.8), description: "Gallery quality" },
                                { size: "30x40", price: Math.round(basePrice * 3.9), description: "Premium large format" }
                            ]
                        }
                        : p
                );
            } else {
                // Create new photo with auto-generated sizes
                const basePrice = Number(price);
                const newPhoto: Photo = {
                    id: Date.now(),
                    title,
                    url: imageUrl,
                    price: basePrice,
                    sizes: [
                        { size: "8x10", price: basePrice, description: "Perfect for desks & shelves" },
                        { size: "16x20", price: Math.round(basePrice * 1.6), description: "Statement piece" },
                        { size: "24x36", price: Math.round(basePrice * 2.8), description: "Gallery quality" },
                        { size: "30x40", price: Math.round(basePrice * 3.9), description: "Premium large format" }
                    ],
                    description,
                    category,
                    isBW
                };
                updatedPhotos = [...photos, newPhoto];
            }

            const response = await fetch('/api/save-photos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPhotos)
            });

            if (!response.ok) throw new Error('Failed to save.');

            setPhotos(updatedPhotos);
            alert(editingId ? 'Photo updated successfully!' : 'Photo saved successfully!');

            // Reset form
            cancelEdit();
        } catch (err) {
            setError('Failed to save photo to disk.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (photoId: number, photoUrl: string) => {
        if (!confirm('Are you sure you want to delete this photo?')) return;

        setLoading(true);
        try {
            // 1. Delete file if it's local
            if (photoUrl.startsWith('/photos/')) {
                const filename = photoUrl.split('/').pop();
                await fetch('/api/delete-file', {
                    method: 'POST',
                    body: JSON.stringify({ filename })
                });
            }

            // 2. Update data file
            const updatedPhotos = photos.filter(p => p.id !== photoId);

            const response = await fetch('/api/save-photos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPhotos)
            });

            if (!response.ok) throw new Error('Failed to update data file.');

            setPhotos(updatedPhotos);
        } catch (err) {
            console.error(err);
            alert('Failed to delete photo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container section">
            <h1 className="section-title mb-xl">Content Manager</h1>

            <div className="grid-2-col mb-xl">
                {/* Configuration & Input */}
                <div>
                    <div className="mb-lg p-4 bg-surface rounded-lg border border-white/10">
                        <h3 className="card-title mb-4 flex-center justify-start gap-2">
                            <Save size={20} className="text-accent" />
                            Settings
                        </h3>
                        <div className="form-group">
                            <label className="form-label">Gemini API Key</label>
                            <div className="flex gap-2">
                                <input
                                    type="password"
                                    className="form-input"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Enter your API Key"
                                />
                                <button onClick={saveApiKey} className="btn btn-secondary">Save</button>
                            </div>
                            <p className="text-xs text-secondary mt-2">Key is saved locally in your browser.</p>
                        </div>
                    </div>

                    {/* Room Configuration Section */}
                    <div className="mb-lg p-4 bg-surface rounded-lg border border-white/10">
                        <h3 className="card-title mb-4 flex-center justify-start gap-2">
                            <Settings size={20} className="text-accent" />
                            Room Configuration
                        </h3>
                        <p className="text-secondary text-sm mb-4">
                            Adjust the perspective and scale of the "View in Room" backgrounds.
                        </p>
                        <button
                            onClick={() => setShowRoomEditor(true)}
                            className="btn btn-secondary w-full"
                        >
                            Launch Room Editor
                        </button>
                    </div>

                    <div className="p-4 bg-surface rounded-lg border border-white/10">
                        <div className="flex-between mb-4">
                            <h3 className="card-title">{editingId ? 'Edit Photo' : 'New Photo Details'}</h3>
                            {editingId && (
                                <button onClick={cancelEdit} className="text-secondary hover:text-white flex-center gap-1 text-sm">
                                    <X size={16} /> Cancel
                                </button>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Sunset Boulevard"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                className="form-input"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Landscape">Landscape</option>
                                <option value="Urban">Urban</option>
                                <option value="Nature">Nature</option>
                                <option value="Portrait">Portrait</option>
                                <option value="Abstract">Abstract</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="flex-center" style={{ gap: '0.5rem', cursor: 'pointer', userSelect: 'none', justifyContent: 'flex-start' }}>
                                <input
                                    type="checkbox"
                                    checked={isBW}
                                    onChange={(e) => setIsBW(e.target.checked)}
                                    style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                                />
                                <span className="form-label" style={{ marginBottom: 0 }}>Black & White</span>
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Price ($)</label>
                            <input
                                type="number"
                                className="form-input"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="150"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Image</label>
                            <div className="flex flex-col gap-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-background hover:file:bg-accent cursor-pointer"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        // 1. Immediate Preview
                                        const objectUrl = URL.createObjectURL(file);
                                        setImageUrl(objectUrl); // Temporary preview
                                        setError('');

                                        // 2. Upload to Server
                                        try {
                                            const response = await fetch('/api/upload', {
                                                method: 'POST',
                                                headers: {
                                                    'x-filename': file.name
                                                },
                                                body: file
                                            });

                                            if (!response.ok) throw new Error('Upload failed');

                                            const data = await response.json();
                                            setImageUrl(data.url); // Update with permanent local path
                                        } catch (err) {
                                            console.error(err);
                                            setError('Failed to upload image');
                                        }
                                    }}
                                />
                                <p className="text-xs text-secondary">
                                    Select a photo from your computer. It will be automatically copied to the project.
                                </p>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-input"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description or generate one..."
                                rows={4}
                                style={{ resize: 'vertical' }}
                            />
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded text-red-200 text-sm flex items-center gap-2">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={generateDescription}
                                disabled={loading}
                                className="btn btn-secondary flex-1"
                            >
                                {loading ? <Loader size={20} className="animate-spin" /> : <Wand2 size={20} />}
                                Generate
                            </button>
                            <button
                                onClick={saveToSite}
                                disabled={loading || !title || !imageUrl}
                                className="btn btn-primary flex-1"
                            >
                                <Save size={20} />
                                {editingId ? 'Update Photo' : 'Save to Site'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview & Result */}
                <div>
                    {imageUrl && (
                        <div className="mb-lg">
                            <h3 className="card-title mb-4">Preview</h3>
                            <div className="w-1/2 aspect-[4/5] bg-surface rounded-lg overflow-hidden border border-white/10 relative">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={() => setError('Invalid Image URL')}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Manage Photos Section */}
            <div className="pt-8 border-t border-white/10">
                <h2 className="section-title mb-lg">Manage Photos</h2>
                <div className="grid-gallery">
                    {photos.map((photo) => (
                        <div key={photo.id} className="bg-surface rounded-lg overflow-hidden border border-white/10 group relative">
                            <div className="aspect-[4/5] relative">
                                <img
                                    src={photo.url}
                                    alt={photo.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleEdit(photo)}
                                        className="p-3 bg-blue-500/80 hover:bg-blue-500 text-white rounded-full transition-colors"
                                        title="Edit Photo"
                                    >
                                        <Pencil size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(photo.id, photo.url)}
                                        className="p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
                                        title="Delete Photo"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <h4 className="font-medium truncate">{photo.title}</h4>
                                <div className="flex-between text-sm text-secondary">
                                    <span>${photo.price}</span>
                                    <span>{photo.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showRoomEditor && (
                <WallView
                    photoUrl={photos[0]?.url || ''} // Use first photo as placeholder
                    onClose={() => setShowRoomEditor(false)}
                    isAdmin={true}
                />
            )}
        </div>
    );
};

export default Admin;
