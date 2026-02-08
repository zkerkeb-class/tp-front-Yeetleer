import { useState } from 'react';
import { useNavigate } from 'react-router';

import './index.css';

const pokeAdd = () => {
    const navigate = useNavigate();
    
    // État initial vide basé sur ton schéma
    const [newPoke, setNewPoke] = useState({
        id: "", // Tu peux aussi le générer automatiquement au back
        name: { french: "", english: "" },
        type: [],
        base: { HP: 0, Attack: 0, Defense: 0, SpecialAttack: 0, SpecialDefense: 0, Speed: 0 },
        image: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/pokemons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPoke)
            });

            if (response.ok) {
                alert("Pokémon ajouté avec succès !");
                navigate('/');
            }
        } catch (error) {
            console.error("Erreur ajout:", error);
        }
    };

    return (
        <div className="add-pokemon-container">
            <h1>Ajouter un nouveau Pokémon</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" placeholder="ID" required
                    onChange={(e) => setNewPoke({...newPoke, id: Number(e.target.value)})} 
                />
                <input 
                    type="text" placeholder="Nom Français" required
                    onChange={(e) => setNewPoke({...newPoke, name: {...newPoke.name, french: e.target.value}})} 
                />
                <input 
                    type="text" placeholder="URL de l'image" 
                    onChange={(e) => setNewPoke({...newPoke, image: e.target.value})} 
                />
                
                <h3>Statistiques de base</h3>
                <div className="stats-grid">
                    <input type="number" placeholder="HP" onChange={(e) => setNewPoke({...newPoke, base: {...newPoke.base, HP: Number(e.target.value)}})} />
                    <input type="number" placeholder="Attaque" onChange={(e) => setNewPoke({...newPoke, base: {...newPoke.base, Attack: Number(e.target.value)}})} />
                </div>

                <button type="submit">Créer le Pokémon</button>
            </form>
        </div>
    );
};

export default pokeAdd;