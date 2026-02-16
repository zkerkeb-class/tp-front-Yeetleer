import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import './index.css';
import selectSound from "../../assets/sounds/select_button.mp3";
import catchSound from "../../assets/sounds/catch.mp3";

const POKEMON_TYPES = [
    "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", 
    "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", 
    "Dragon", "Dark", "Steel", "Fairy"
];

const pokeAdd = () => {
    const navigate = useNavigate();
    
    const [newPoke, setNewPoke] = useState({
        id: "",
        name: {french: ""},
        type: [],
        base: { HP: 0, Attack: 0, Defense: 0, SpecialAttack: 0, SpecialDefense: 0, Speed: 0 },
        image: ""
    });

const handleType = (index, value) => {
    // On crée une copie du tableau de types actuel
    const updatedTypes = [...(newPoke.type || [])];

    if (value === "") {
        // Si l'utilisateur choisit l'option vide, on retire ce type
        updatedTypes.splice(index, 1);
    } else {
        // Sinon, on met à jour le type à l'index 0 ou 1
        updatedTypes[index] = value;
    }

    // On enlève les doublons et les valeurs vides
    const cleanTypes = [...new Set(updatedTypes.filter(Boolean))].slice(0, 2);

    // On met à jour l'objet global
    setNewPoke({
        ...newPoke,
        type: cleanTypes
    });
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/pokemons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPoke)
            });

            if (response.ok) {
                toast.success("Le Pokémon a été capturé !");
                playCatch();
                navigate('/');
            }
        } catch (error) {
            toast.error("Le Pokémon s'est échappé !");
        }
    };

    const playSelect = () => {
        const audio = new Audio(selectSound); 
        audio.volume = 0.8;
        audio.play();
    };

    const playCatch = () => {
        const audio = new Audio(catchSound); 
        audio.volume = 0.6;
        audio.play();
    };

    return (
        <div className="add-pokemon-container">
            <h1 className="add-pokemon-title">Quel est ce Pokémon !</h1>
            <form className="info-form" onSubmit={handleSubmit}>
                <input 
                    className="input-bar"
                    type="number" placeholder="ID du Pokémon" required
                    onChange={(e) => setNewPoke({...newPoke, id: Number(e.target.value)})} 
                />
                <input
                    className="input-bar"
                    type="text" placeholder="Nom du Pokémon" required
                    onChange={(e) => setNewPoke({...newPoke, name: {...newPoke.name, french: e.target.value}})} 
                />

                <div>
                    <label>Types du Pokémon:</label>
                    <select className="input-bar" required onChange={(e) => handleType(0, e.target.value)} onClick={playSelect}>
                        <option value="">Type 1 (obligatoire)</option>
                        {POKEMON_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>

                    <select className="input-bar" onChange={(e) => handleType(1, e.target.value)} onClick={playSelect}>
                        <option value="">Type 2 (facultatif)</option>
                        {POKEMON_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                
                <input
                    className="input-bar"
                    type="text" placeholder="URL de l'image" 
                    onChange={(e) => setNewPoke({...newPoke, image: e.target.value})} 
                />
                
                <h3>Statistiques de base :</h3>
                <div className="stats-grid">
                    <input className="input-bar" type="number" placeholder="PV" required onChange={(e) => setNewPoke({...newPoke, base: {...newPoke.base, HP: Number(e.target.value)}})} /> <br/>
                    <input className="input-bar" type="number" placeholder="Attaque" onChange={(e) => setNewPoke({...newPoke, base: {...newPoke.base, Attack: Number(e.target.value)}})} /> <br/>
                    <input className="input-bar" type="number" placeholder="Défense" onChange={(e) => setNewPoke({...newPoke, base: {...newPoke.base, Defense: Number(e.target.value)}})} /> <br/>
                    <input className="input-bar" type="number" placeholder="Attaque Spéciale" onChange={(e) => setNewPoke({...newPoke, base: {...newPoke.base, SpecialAttack: Number(e.target.value)}})} /> <br/>
                    <input className="input-bar" type="number" placeholder="Défense Spéciale" onChange={(e) => setNewPoke({...newPoke, base: {...newPoke.base, SpecialDefense: Number(e.target.value)}})} /> <br/>
                    <input className="input-bar" type="number" placeholder="Vitesse" onChange={(e) => setNewPoke({...newPoke, base: {...newPoke.base, Speed: Number(e.target.value)}})} /> <br/>
                </div>
                <button className="poke-create-button" type="submit">1...2...3... *clic* Taadaa !</button>
            </form>
        </div>
    );
};

export default pokeAdd;