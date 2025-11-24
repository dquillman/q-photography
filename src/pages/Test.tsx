import { PHOTOS } from '../data/photos_final';

const Test = () => {
    const LOCAL_PHOTOS = [{ id: 1, title: "Local Test" }];
    console.log('Test Page Render', PHOTOS);
    return (
        <div style={{ padding: 100, color: 'white' }}>
            <h1>Test Page</h1>
            <p>Is Array: {Array.isArray(PHOTOS) ? 'Yes' : 'No'}</p>
            <p>Length: {PHOTOS?.length}</p>
            <pre>Imported: {JSON.stringify(PHOTOS?.[0], null, 2)}</pre>
            <pre>Local: {JSON.stringify(LOCAL_PHOTOS[0], null, 2)}</pre>
        </div>
    );
};

export default Test;
