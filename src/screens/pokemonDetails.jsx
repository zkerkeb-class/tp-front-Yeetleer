import { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router';
import { useNavigate } from 'react-router';

import ModalConfirmation from '../components/modalConfirmation/index.jsx';

import './pokemonDetails.css';

const PokemonDetails = () => { 
    const {id} = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [editing, setEditing] = useState(false);
    const [pokemonEdition, setPokemonEdition] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const URL_DETAIL = `http://localhost:3000/pokemons/${id}`;

    useEffect(() => {
        fetch(URL_DETAIL)
            .then(response => response.json())
            .then(data => setPokemon(data))
            .catch(error => console.error("Erreur:", error));
    }, [id]);


    const updatePokemon = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(URL_DETAIL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pokemonEdition)
        });

            if (response.ok) {
                setPokemon(pokemonEdition);
                setEditing(false);
                alert("Modifications enregistrées !");
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const deletePokemon = async () => {
        try {
            const response = await fetch(URL_DETAIL, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Le Pokémon a été supprimé !");
                navigate('/');
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    if (!pokemon){
        return <p>Chargement des informations du Pokémon...</p>;
    }

    let pokemon_details;
    if (editing) {

        pokemon_details = (
            <form onSubmit={updatePokemon} className="edit-form">
                <h1>Modifier {pokemon.name?.french}</h1>
                <div className="form-group">
                    <label>Nom :</label>
                    <input 
                        type="text" 
                        value={pokemonEdition.name?.french} 
                        onChange={(e) => setPokemonEdition({...pokemonEdition, name: {...pokemonEdition.name, french: e.target.value}})}
                    />
                </div>
                <div className="form-actions">
                        <div className="form-group">
                            <label>Points de Vie (HP) :</label>
                            <input 
                                type="number" 
                                value={pokemonEdition.base?.HP} 
                                onChange={(e) => setPokemonEdition({...pokemonEdition, base: {...pokemonEdition.base, HP: Number(e.target.value)}})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Attaque :</label>
                            <input 
                                type="number" 
                                value={pokemonEdition.base?.Attack} 
                                onChange={(e) => setPokemonEdition({...pokemonEdition, base: {...pokemonEdition.base, Attack: Number(e.target.value)}})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Défense :</label>
                            <input 
                                type="number" 
                                value={pokemonEdition.base?.Defense} 
                                onChange={(e) => setPokemonEdition({...pokemonEdition, base: {...pokemonEdition.base, Defense: Number(e.target.value)}})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Attaque Spéciale :</label>
                            <input 
                                type="number" 
                                value={pokemonEdition.base?.SpecialAttack} 
                                onChange={(e) => setPokemonEdition({...pokemonEdition, base: {...pokemonEdition.base, SpecialAttack: Number(e.target.value)}})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Défense Spéciale :</label>
                            <input 
                                type="number" 
                                value={pokemonEdition.base?.SpecialDefense} 
                                onChange={(e) => setPokemonEdition({...pokemonEdition, base: {...pokemonEdition.base, SpecialDefense: Number(e.target.value)}})}
                            />
                        </div>

                        <div className="form-group">
                            <label>Vitesse :</label>
                            <input 
                                type="number" 
                                value={pokemonEdition.base?.Speed} 
                                onChange={(e) => setPokemonEdition({...pokemonEdition, base: {...pokemonEdition.base, Speed: Number(e.target.value)}})}
                            />
                        </div>
                    <button type="submit">Sauvegarder</button>
                    <button type="button" onClick={() => setEditing(false)}>Annuler</button>
                </div>
            </form>
        );
    }
    else {
        pokemon_details = (
            <div>
                <h1>{pokemon.name?.french}</h1>
                <img src={pokemon.image} alt={pokemon.name?.french} style={{width: '200px'}} />
                <p>Statistique de base :</p>
                <div className="stats">
                    <p>PV : {pokemon.base?.HP}</p>
                    <p>Attaque : {pokemon.base?.Attack}</p>
                    <p>Défense : {pokemon.base?.Defense}</p>
                    <p>Attaque Spécial : {pokemon.base?.SpecialAttack}</p>
                    <p>Défense Spécial : {pokemon.base?.SpecialDefense}</p>
                    <p>Vitesse : {pokemon.base?.Speed}</p>
                </div>
                <button onClick={() => {setPokemonEdition(pokemon); setEditing(true);}}>Modifier les infos</button>
                <button className="delete-poke-button" onClick={() => setShowModal(true)}>Supprimer le Pokémon</button>
                <ModalConfirmation openModal={showModal} cancelDeletion={() => setShowModal(false)} confirmDeletion={deletePokemon} pokemonName={pokemon?.name?.french} />
            </div>
        );
    }

    return (
        <div>
            {pokemon_details}
            <Link to="/">Retour à la liste des Pokémon</Link>

        </div>
    );
    
};

export default PokemonDetails;