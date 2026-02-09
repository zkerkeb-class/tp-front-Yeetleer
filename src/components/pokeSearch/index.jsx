import './index.css';

const PokeSearch = ({ value, onChange }) => {
    return (
        <div className="poke-search-bar">
            <input 
                className="poke-search-bar-text"
                type="text"
                placeholder="Rechercher un Pokémon"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default PokeSearch;