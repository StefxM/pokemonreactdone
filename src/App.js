import { useEffect, useState } from "react";
import PokemonThumnail from "./components/PokemonThumbnail";

function App() {
//Empty array to put all the pokemon in
  const [allPokemons, setAllPokemons] = useState([])
//Setting up the loadmore from the API 
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon')
//function loading pokemon on load
  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()
//setting up loadmore button
    setLoadMore(data.next)
    
    function createPokemonObject (result) {
      result.forEach( async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()
        //get the currentlist of pokemon, spread it out and add the new object
        setAllPokemons(currentList => [...currentList, data])
        //allPokemons.push(data)
        await allPokemons.sort((a,b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
    await console.log(allPokemons)
  }

  useEffect(() => {
   getAllPokemons()
  }, [])

  return (
    <div className="app-container">
     <center><h1>Pokemon evolution</h1></center>
     <div className="pokemon-container">
      <div className="all-containers">
    {allPokemons.map((pokemon, index) => 
      <PokemonThumnail
      id={pokemon.id}
      name={pokemon.name}
      image={pokemon.sprites.other["official-artwork"].front_shiny}
      type={pokemon.types[0].type.name}
      key={index}
      />
      )}
      </div>
      <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
     </div>
    </div>
  );
}

export default App;
