import './index.css';

const ModalConfirmation = ({ openModal, cancelDeletion, confirmDeletion, pokemonName }) => {
    if (!openModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Confirmation !</h3>
                <p>Êtes-vous sûr de laisser <strong>{pokemonName}</strong> à Prof. Chen ?</p>
                <div className="modal-buttons">
                    <button className="modal-delete-button" onClick={confirmDeletion}>Adieu, <strong>{pokemonName}</strong></button>
                    <button className="modal-cancel-button" onClick={cancelDeletion}>Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmation;