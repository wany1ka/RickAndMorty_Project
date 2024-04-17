import { useLocation } from 'react-router-dom';

const Character = () => {
    const { state: Character } = useLocation();

    return (
        <div className='max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
            <h1 className='text-2x1 font-bold mb-2'>Character Details</h1>
            <p className='text-gray-700'><strong>Name:</strong> {Character.name}</p>
            <p className='text-gray-700'><strong>Status:</strong> {Character.status}</p>
            <p className='text-gray-700'><strong>Origin</strong> {Character.origin.name}</p>
            <p className='text-gray-700'><img src={Character.image} alt={Character.id} style={{width: 300, height: 300}} /></p>
        </div>
    );
};

export default Character;