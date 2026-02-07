import { useEffect, useState } from "react";
import { Link } from "react-router";
import usePokemon from "../../hook/usePokemon";

import './index.css';
import PokeTitle from "./pokeTitle";
import PokeImage from "./pokeImage";

const PokeCard = ({ pokemon }) => {

    const statsArray = Object.entries(pokemon.base);

    return (
        <Link to={`/pokemonDetails/${pokemon.id}`}>
        <div className="poke-card">

            <div className={`poke-card-header poke-type-${pokemon.type[0]?.toLowerCase()}`}>
                <PokeTitle name={pokemon.name} />
            </div>

            <div className="poke-image-background">
                
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