import { useEffect, useState } from "react";
import { Link } from "react-router";

import './index.css';
import PokeTitle from "./pokeTitle";
import PokeImage from "./pokeImage";
import selectSound from "../../assets/sounds/select_button.mp3";

const PokeCard = ({ pokemon }) => {

    const statsArray = Object.entries(pokemon.base);

    const playSelect = () => {
        const audio = new Audio(selectSound); 
        audio.volume = 0.8;
        audio.play();
    }

    return (
        <Link to={`/pokemonDetails/${pokemon.id}`} onClick={playSelect}>
        <div className="poke-card">

            <div className={`poke-card-header`}>
                <PokeTitle name={pokemon.name} />
            </div>

            <div className={`poke-image-background poke-type-${pokemon.type[0]?.toLowerCase()}`}>
                <PokeImage imageUrl={pokemon.image} />
            </div>

            <div>
                {statsArray.map(([statName, statValue]) => (
                    <div className="poke-stat-row" key={statName}>
                        <span className={`poke-type-font poke-type-${statName.toLowerCase()}`}>
                            {statName}
                        </span>
                        <span className="poke-type-font poke-stat-value">
                            {statValue}
                        </span>
                    </div>
                ))}
            </div>
        </div>
        </Link>
    );
}

export default PokeCard;