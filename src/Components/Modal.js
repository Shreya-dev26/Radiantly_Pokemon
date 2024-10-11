// src/Components/Modal.js
import React from 'react';
import '../Styles/Modal.css'; // Optional: Add some styles for the modal

const Modal = ({ isOpen, onClose, pokemon }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}> {/* Close modal on overlay click */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside the modal */}
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p><strong>Abilities:</strong> {pokemon.abilities.map((ability, index) => (
          <span key={index}>{ability.ability.name}{index < pokemon.abilities.length - 1 ? ', ' : ''}</span>
        ))}</p>
        <p><strong>Types:</strong> {pokemon.types.map((type, index) => (
          <span key={index}>{type.type.name}{index < pokemon.types.length - 1 ? ', ' : ''}</span>
        ))}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
