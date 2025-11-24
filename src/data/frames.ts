export interface Frame {
    id: string;
    name: string;
    border: string;
    boxShadow: string;
    backgroundColor?: string;
    padding?: string;
}

export const FRAMES: Frame[] = [
    {
        id: 'none',
        name: 'Canvas Wrap',
        border: 'none',
        boxShadow: '5px 5px 15px rgba(0,0,0,0.3)',
        padding: '0'
    },
    {
        id: 'black',
        name: 'Modern Black',
        border: '15px solid #1a1a1a',
        boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
        padding: '0'
    },
    {
        id: 'white',
        name: 'Classic White',
        border: '15px solid #f5f5f5',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        padding: '0'
    },
    {
        id: 'walnut',
        name: 'Walnut',
        border: '20px solid #5d4037',
        boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
        padding: '0'
    },
    {
        id: 'oak',
        name: 'Oak',
        border: '20px solid #d7ccc8',
        boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
        padding: '0'
    },
    {
        id: 'gold',
        name: 'Gold',
        border: '15px solid #c5a059',
        boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
        padding: '0'
    },
    {
        id: 'black-mat',
        name: 'Black with Mat',
        border: '15px solid #1a1a1a',
        boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
        padding: '25px',
        backgroundColor: '#fff'
    },
    {
        id: 'walnut-mat',
        name: 'Walnut with Mat',
        border: '20px solid #5d4037',
        boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
        padding: '25px',
        backgroundColor: '#fff'
    }
];
