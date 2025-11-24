import { useState, useEffect, useRef } from 'react';
import { X, Maximize, Minimize, Settings, Save, RotateCcw, Upload } from 'lucide-react';
import { ROOMS, Room } from '../data/rooms';
import { FRAMES, Frame } from '../data/frames';

interface WallViewProps {
    photoUrl: string;
    onClose: () => void;
    isAdmin?: boolean;
}

const WallView = ({ photoUrl, onClose, isAdmin = false }: WallViewProps) => {
    const [selectedRoom, setSelectedRoom] = useState<Room>(ROOMS[0]);
    const [selectedFrame, setSelectedFrame] = useState<Frame>(FRAMES[1]); // Default to Black
    const [scale, setScale] = useState(1);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Custom Room State
    const [customRooms, setCustomRooms] = useState<Room[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Editor State
    const [editMode, setEditMode] = useState(false);
    const [roomConfigs, setRoomConfigs] = useState<Room[]>(ROOMS);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setImageLoaded(false);
        const img = new Image();
        img.src = selectedRoom.image;
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageLoaded(false);
    }, [selectedRoom]);

    // Get current config for the selected room
    // If it's a custom room, check customRooms array, otherwise check roomConfigs (for persistent admin edits)
    const currentConfig = selectedRoom.isCustom
        ? (customRooms.find(r => r.id === selectedRoom.id) || selectedRoom)
        : (roomConfigs.find(r => r.id === selectedRoom.id) || selectedRoom);

    const updateConfig = (updates: Partial<Room['placement']>) => {
        if (selectedRoom.isCustom) {
            setCustomRooms(prev => prev.map(room => {
                if (room.id === selectedRoom.id) {
                    return {
                        ...room,
                        placement: { ...room.placement, ...updates }
                    };
                }
                return room;
            }));
        } else {
            setRoomConfigs(prev => prev.map(room => {
                if (room.id === selectedRoom.id) {
                    return {
                        ...room,
                        placement: { ...room.placement, ...updates }
                    };
                }
                return room;
            }));
        }
    };

    const saveConfiguration = async () => {
        if (selectedRoom.isCustom) {
            alert('Custom room configurations are temporary and cannot be saved to the server.');
            return;
        }

        setSaving(true);
        try {
            const response = await fetch('/api/save-rooms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomConfigs)
            });
            if (!response.ok) throw new Error('Failed to save');
            alert('Room configuration saved!');
            setEditMode(false);
        } catch (err) {
            alert('Failed to save configuration');
        } finally {
            setSaving(false);
        }
    };

    const resetConfiguration = () => {
        if (selectedRoom.isCustom) {
            // Reset custom room to default center
            const defaultCustom = {
                ...selectedRoom,
                placement: {
                    top: '50%',
                    left: '50%',
                    width: '30%',
                    transform: 'none',
                    boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.5)'
                }
            };
            setCustomRooms(prev => prev.map(r => r.id === selectedRoom.id ? defaultCustom : r));
            return;
        }

        // Find original default for this room
        const original = ROOMS.find(r => r.id === selectedRoom.id);
        if (original) {
            setRoomConfigs(prev => prev.map(room =>
                room.id === selectedRoom.id ? original : room
            ));
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        const newRoom: Room = {
            id: `custom-${Date.now()}`,
            name: 'My Room',
            color: '#111',
            image: imageUrl,
            isCustom: true,
            placement: {
                top: '50%',
                left: '50%',
                width: '30%',
                transform: 'none',
                boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.5)'
            }
        };

        setCustomRooms(prev => [...prev, newRoom]);
        setSelectedRoom(newRoom);

        // Auto-enable edit mode for custom rooms so they can position it
        setEditMode(true);
    };

    // Helper to parse transform string
    const getTransformValue = (type: string) => {
        const transform = currentConfig.placement.transform || '';
        const match = transform.match(new RegExp(`${type}\\(([^)]+)\\)`));
        return match ? parseFloat(match[1]) : 0;
    };

    const updateTransform = (type: string, value: number, unit: string) => {
        let transform = currentConfig.placement.transform || '';

        if (transform === 'none' || !transform) {
            transform = 'perspective(1000px)';
        }

        // Ensure perspective exists if it's missing (unless it's 'none', which we just handled)
        if (!transform.includes('perspective')) {
            transform = `perspective(1000px) ${transform}`;
        }

        // Remove existing value of this type
        // This regex handles: "rotateY(10deg)", "rotateY(-10deg)", etc.
        const regex = new RegExp(`${type}\\([^)]+\\)`);
        if (regex.test(transform)) {
            transform = transform.replace(regex, `${type}(${value}${unit})`);
        } else {
            transform = `${transform} ${type}(${value}${unit})`;
        }

        updateConfig({ transform: transform.trim() });
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 50, display: 'flex', gap: '1rem' }}>
                <button
                    onClick={onClose}
                    className="btn btn-icon"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                    <X size={24} />
                </button>
            </div>

            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Main View Area */}
                <div style={{
                    flex: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#111',
                    paddingBottom: editMode ? '16rem' : '2rem', // Make room for editor
                    transition: 'padding 0.3s'
                }}>
                    {/* Room Background */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            transition: 'opacity 0.5s',
                            backgroundColor: selectedRoom.color,
                            backgroundImage: imageLoaded ? `url(${selectedRoom.image})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {!imageLoaded && (
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                opacity: 0.1,
                                backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                                backgroundSize: '50px 50px'
                            }} />
                        )}
                    </div>

                    {/* Photo Overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            top: currentConfig.placement.top,
                            left: currentConfig.placement.left,
                            width: currentConfig.placement.width,
                            transform: `translate(-50%, -50%) scale(${scale}) ${currentConfig.placement.transform || ''}`,
                            // We apply the shadow to the wrapper if it's a simple frame, 
                            // but for complex frames (padding), we might want it on the inner or outer.
                            // Let's apply the frame's shadow here for the outer depth.
                            boxShadow: selectedFrame.boxShadow,
                            transition: editMode ? 'none' : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            zIndex: 10,
                            transformOrigin: 'center center',
                            // Frame Styles
                            border: selectedFrame.border,
                            padding: selectedFrame.padding,
                            backgroundColor: selectedFrame.backgroundColor || 'transparent'
                        }}
                    >
                        <img
                            src={photoUrl}
                            alt="Wall preview"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                display: 'block',
                                // Inner shadow for depth if needed
                                boxShadow: selectedFrame.padding ? '0 0 10px rgba(0,0,0,0.2)' : 'none'
                            }}
                        />
                    </div>
                </div>

                {/* Controls Bar */}
                <div style={{
                    backgroundColor: 'var(--color-surface)',
                    borderTop: '1px solid var(--color-border)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    zIndex: 60,
                    position: 'relative'
                }}>
                    {editMode ? (
                        <div className="container" style={{ maxWidth: '1000px' }}>
                            <div className="flex-between mb-4">
                                <h3 className="card-title text-accent">
                                    {selectedRoom.isCustom ? 'Adjust Position' : `Room Editor: ${selectedRoom.name}`}
                                </h3>
                                <div className="flex gap-2">
                                    <button onClick={resetConfiguration} className="btn btn-secondary text-sm py-1 px-3">
                                        <RotateCcw size={14} className="mr-1" /> Reset
                                    </button>
                                    {!selectedRoom.isCustom && (
                                        <button onClick={saveConfiguration} disabled={saving} className="btn btn-primary text-sm py-1 px-3">
                                            <Save size={14} className="mr-1" /> {saving ? 'Saving...' : 'Save Config'}
                                        </button>
                                    )}
                                    {selectedRoom.isCustom && (
                                        <button onClick={() => setEditMode(false)} className="btn btn-primary text-sm py-1 px-3">
                                            Done
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <label className="block text-secondary mb-1">Top Position</label>
                                    <input
                                        type="range" min="0" max="100"
                                        value={parseFloat(currentConfig.placement.top)}
                                        onChange={(e) => updateConfig({ top: `${e.target.value}%` })}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-secondary mb-1">Left Position</label>
                                    <input
                                        type="range" min="0" max="100"
                                        value={parseFloat(currentConfig.placement.left)}
                                        onChange={(e) => updateConfig({ left: `${e.target.value}%` })}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-secondary mb-1">Width (Scale)</label>
                                    <input
                                        type="range" min="10" max="80"
                                        value={parseFloat(currentConfig.placement.width)}
                                        onChange={(e) => updateConfig({ width: `${e.target.value}%` })}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-secondary mb-1">Rotate Y (Perspective)</label>
                                    <input
                                        type="range" min="-60" max="60"
                                        value={getTransformValue('rotateY')}
                                        onChange={(e) => updateTransform('rotateY', parseFloat(e.target.value), 'deg')}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-secondary mb-1">Rotate X (Tilt)</label>
                                    <input
                                        type="range" min="-60" max="60"
                                        value={getTransformValue('rotateX')}
                                        onChange={(e) => updateTransform('rotateX', parseFloat(e.target.value), 'deg')}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="container" style={{ maxWidth: '1000px' }}>
                            <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
                                <div>
                                    <h3 className="card-title" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Room</h3>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {/* Default Rooms */}
                                        {ROOMS.map((room) => (
                                            <button
                                                key={room.id}
                                                onClick={() => setSelectedRoom(room)}
                                                style={{
                                                    width: '2.5rem',
                                                    height: '2.5rem',
                                                    borderRadius: '0.5rem',
                                                    border: selectedRoom.id === room.id ? '2px solid var(--color-accent)' : '2px solid transparent',
                                                    backgroundColor: room.color,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                                title={room.name}
                                            />
                                        ))}

                                        {/* Custom Rooms */}
                                        {customRooms.map((room) => (
                                            <button
                                                key={room.id}
                                                onClick={() => setSelectedRoom(room)}
                                                style={{
                                                    width: '2.5rem',
                                                    height: '2.5rem',
                                                    borderRadius: '0.5rem',
                                                    border: selectedRoom.id === room.id ? '2px solid var(--color-accent)' : '2px solid transparent',
                                                    backgroundColor: '#333',
                                                    backgroundImage: `url(${room.image})`,
                                                    backgroundSize: 'cover',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                                title={room.name}
                                            />
                                        ))}

                                        {/* Upload Button */}
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            style={{
                                                width: '2.5rem',
                                                height: '2.5rem',
                                                borderRadius: '0.5rem',
                                                border: '1px dashed var(--color-secondary)',
                                                backgroundColor: 'transparent',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--color-secondary)'
                                            }}
                                            title="Upload Room"
                                        >
                                            <Upload size={16} />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="card-title" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Frame</h3>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {FRAMES.map((frame) => (
                                            <button
                                                key={frame.id}
                                                onClick={() => setSelectedFrame(frame)}
                                                style={{
                                                    width: '2.5rem',
                                                    height: '2.5rem',
                                                    borderRadius: '0.5rem',
                                                    border: selectedFrame.id === frame.id ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                                                    backgroundColor: frame.id === 'white' ? '#f5f5f5' : frame.id === 'gold' ? '#c5a059' : frame.id === 'oak' ? '#d7ccc8' : frame.id === 'walnut' ? '#5d4037' : '#1a1a1a',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}
                                                title={frame.name}
                                            >
                                                {frame.id === 'none' && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        background: 'linear-gradient(45deg, transparent 48%, #fff 48%, #fff 52%, transparent 52%)',
                                                        backgroundColor: '#333'
                                                    }} />
                                                )}
                                                {frame.padding && frame.padding !== '0' && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        inset: '6px',
                                                        backgroundColor: '#fff'
                                                    }} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ flex: 1, maxWidth: '200px' }}>
                                    <h3 className="card-title" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Size</h3>
                                    <div className="flex-center gap-4" style={{ gap: '0.75rem' }}>
                                        <Minimize size={16} className="text-secondary" />
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="1.5"
                                            step="0.1"
                                            value={scale}
                                            onChange={(e) => setScale(parseFloat(e.target.value))}
                                            style={{
                                                flex: 1,
                                                height: '0.25rem',
                                                backgroundColor: 'rgba(255,255,255,0.1)',
                                                borderRadius: '1rem',
                                                appearance: 'none',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <Maximize size={16} className="text-secondary" />
                                    </div>
                                </div>

                                {(isAdmin || selectedRoom.isCustom) && (
                                    <div>
                                        <h3 className="card-title" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Tools</h3>
                                        <button
                                            onClick={() => setEditMode(true)}
                                            className="btn btn-secondary flex-center gap-2 text-sm"
                                            style={{ height: '2.5rem', padding: '0 1rem' }}
                                        >
                                            <Settings size={16} />
                                            {selectedRoom.isCustom ? 'Adjust' : 'Edit Room'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WallView;
