import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonDetails from "./Components/PokemonDetails";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [storedPokemon, setStoredPokemon] = useState({});
  useEffect(() => {
    const pokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon"
        );
        setPokemonList(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    pokemonData();
  }, []);

  const handleSelectionChange = (event) => {
    setSelectedPokemon(event.target.value);
  };

  const fetchPokemonDetails = async (url) => {
    if (storedPokemon[url]) {
      return storedPokemon[url];
    }
    const pokemonDetails = await axios.get(url);
    setStoredPokemon((prevState) => ({ ...prevState, [url]: pokemonDetails.data }));
    return pokemonDetails.data;
  };

  return (
    <>
      <h1>Pokemon Details</h1>

      <select onChange={handleSelectionChange}>
        <option value="">Select a Pokémon</option>
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.url}>
            {pokemon.name}
          </option>
        ))}
      </select>
      {selectedPokemon && (
        <PokemonDetails
          url={selectedPokemon}
          fetchPokemonDetails={fetchPokemonDetails}
        />
      )}
    </>
  );
}

export default App;
