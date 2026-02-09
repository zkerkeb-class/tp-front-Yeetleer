import './index.css';

const PokeBouton = ({ page, setPage, suiteListe }) => {
  return (
    <div className="poke-list-button">
      <button className="poke-page-button" disabled={page === 1} onClick={() => setPage(page - 1)}>Précédent</button>
      <span>Page {page}</span>
      <button className="poke-page-button" disabled={!suiteListe} onClick={() => setPage(page + 1)}>Suivant</button>
    </div>
  );
};

export default PokeBouton;