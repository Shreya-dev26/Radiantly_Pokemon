import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './Components/PokemonCard';
import Modal from './Components/Modal'; // Import the Modal component
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null); // State for selected Pokémon
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Fetch Pokemon data
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = response.data.results;

        const pokemonDetails = await Promise.all(
          data.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
            return pokemonResponse.data;
          })
        );
        setPokemon(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  // Filter Pokemon based on search input
  const filteredPokemon = pokemon.filter(poke =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (poke) => {
    setSelectedPokemon(poke);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="pokemon-list">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((poke) => (
            <div key={poke.id} onClick={() => openModal(poke)}>
              <PokemonCard pokemon={poke} />
            </div>
          ))
        ) : (
          <p>No Pokémon found</p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        pokemon={selectedPokemon}
      />
    </div>
  );
};

export default App;
