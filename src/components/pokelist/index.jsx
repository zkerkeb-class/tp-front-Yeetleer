import { useState, useEffect } from "react";
import PokeCard from "../pokeCard";
import PokeBouton from '../pokePage';
import { Link } from "react-router";

import './index.css';
import PokeSearch from "../pokeSearch";
import selectSound from "../../assets/sounds/select_button.mp3";

const PokeList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchPokemon, setSearchPokemon] = useState("");

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

    useEffect(() => {
    const URL_API = `http://localhost:3000/pokemons?page=${page}`;
    const URL = searchPokemon ? `http://localhost:3000/pokemons/recherche/${searchPokemon}`: URL_API;
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            setPokemons(Array.isArray(data) ? data : [data]);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [searchPokemon, page]);

    const playSelect = () => {
        const audio = new Audio(selectSound); 
        audio.volume = 0.8;
        audio.play();
    }

    if (loading) {
        return <p>Chargement...</p>
    }

    return (
        <>
        <div  className="poke-list-container">
            <h1 className="poke-list-title">POKEDEX NATIONAL : Kanto </h1>
            <PokeSearch value={searchPokemon} onChange={(val) => {setSearchPokemon(val); setPage(1);}} />
            <ul className="poke-list">
                {pokemons.map((pokemon) => (
                    <PokeCard key={pokemon.id} pokemon={pokemon} onClick={playSelect} />
                ))}
            </ul>
            <Link to="/ajoutPokemon" className="poke-button-add" onClick={playSelect}>Capturer un nouveau Pokémon</Link>
            <PokeBouton page={page} setPage={setPage} suiteListe={pokemons.length === 20} />
        </div>
        </>
    );
};

export default PokeList;
