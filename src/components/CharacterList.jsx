import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style.css'

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCharacters = async () => {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character');
            if (!response.ok) {
                throw new Error('Failed to fetch Characters');
            }
            const data = await response.json();
            setCharacters(data.results);
        } catch (error) {
            console.error('Error fetching Characters:', error);
            setCharacters([]);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    const deleteCharacter = (id) => {
        const updatedCharacters = characters.filter(character => character.id !== id);
        setCharacters(updatedCharacters);
    };

    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <h1 className='font-bold text-3xl text-center text-red-500 my-4'>Rick And Morty Characters</h1>
            <input
                type="text"
                placeholder="Search characters"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='mx-6 my-4 mb-9 w-1/2 border border-red-600  py-3'
            />
            <div className='grid grid-cols-3 gap-4'>
                {filteredCharacters.map(character => (
                    <div key={character.id} className='border p-4'>
                        <Link to={`characters/${character.id}`} state={character}>
                            <h3 className='text-xl text-center font-bold'>{character.name}</h3>
                            <img src={character.image} alt={character.name} style={{ width: 400, height: 300 }} />
                        </Link>
                        <button className='font-mono text-center bg-red-500 mt-4 text-gray-100 hover:text-gray-300 border border-gray-300 rounded-lg p-2 w-64 ml-10' onClick={() => deleteCharacter(character.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharacterList;
