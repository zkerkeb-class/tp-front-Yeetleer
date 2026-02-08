import { useState, useEffect } from "react";
import PokeCard from "../pokeCard";
import PokeBouton from '../pokePage';
import { Link } from "react-router";

import './index.css';

const PokeList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const URL_API = `http://localhost:3000/pokemons?page=${page}`;
        const ancien_URL_au_cas_ou = "https://pokeapi.co/api/v2/pokemon?/limit=30";

        fetch(URL_API)
            .then((response) => response.json())
            .then((data) => {
                console.log("Données reçues:", data);
                setPokemons(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erreur:", error);
                setLoading(false);
            });
    }, [page]);

    if (loading) {
        return <p>Chargement...</p>
    }

    return (
        <>
        <Link to="/ajoutPokemon" className="btn-add"> Ajouter un Pokémon</Link>
        <div  className="poke-list-container">
            <h2>Liste des Pokémon</h2>
            <ul className="poke-list">
                {pokemons.map((pokemon) => (
                    <PokeCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </ul>
            <PokeBouton page={page} setPage={setPage} suiteListe={pokemons.length === 20} />
        </div>
        </>
    );
};

export default PokeList;
