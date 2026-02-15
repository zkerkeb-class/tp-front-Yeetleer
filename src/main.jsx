import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import PokemonDetails from './screens/pokemonDetails.jsx';
import PokeAdd from './components/pokeAdd/index.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <ToastContainer theme="dark" position="bottom-right" icon={false} />
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pokemonDetails/:id" element={<PokemonDetails />} />
        <Route path="/ajoutPokemon" element={<PokeAdd />} />
    </Routes>
</BrowserRouter>
,
)
