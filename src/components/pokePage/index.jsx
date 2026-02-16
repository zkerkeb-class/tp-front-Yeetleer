import './index.css';
import selectSound from "../../assets/sounds/select_button.mp3";

const PokeBouton = ({ page, setPage, suiteListe }) => {

  const playSelect = () => {
    const audio = new Audio(selectSound); 
    audio.volume = 0.8;
    audio.play();
  };

  return (
    <div className="poke-list-button">
      <button className="poke-page-button" disabled={page === 1} onClick={() => { playSelect(); setPage(page - 1); }}>Précédent</button>
      <span>Page {page}</span>
      <button className="poke-page-button" disabled={!suiteListe} onClick={() => { playSelect(); setPage(page + 1); }}>Suivant</button>
    </div>
  );
};

export default PokeBouton;