import { useEffect, useState } from "react";

const PokemonDetails = ({ url, fetchPokemonDetails }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const getPokemonDetails = async () => {
      const details = await fetchPokemonDetails(url);
      setPokemonDetails(details);
    };

    getPokemonDetails();
  }, [url, fetchPokemonDetails]);

  if (!pokemonDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>{pokemonDetails.name}</h2>
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <h3>Abilities</h3>
      <ul>
        {pokemonDetails.abilities.map((ability) => {
          return <li key={ability.ability.name}>{ability.ability.name}</li>;
        })}
      </ul>
    </>
  );
};

export default PokemonDetails;
