import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    
    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <input
                type="text"
                placeholder="Search characters"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='mx-6 my-4'
            />
            <div className='grid grid-cols-3 gap-4'>
                {filteredCharacters.map(character => (
                    <div key={character.id} className='border p-4'>
                        <h3 className='text-xl font-bold'>{character.name}</h3>
                        <p className='italic text-lg font-mono'>{character.status}</p>
                        <p>{character.species}</p>
                        <img src={character.image} alt={character.name} style={{ width: 200, height: 200 }} />
                        <Link to={`characters/${character.id}`} state={character}>
                            <button className="font-serif text-center bg-red-500 mt-4 text-gray-100 hover:text-gray-300 border border-gray-300 rounded-lg">Read more</button>
                        </Link>
                        <button onClick={() => deleteCharacter(character.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharacterList;
