const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for( let i=1; i <= 150; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then( res => res.json()));
    };
        
        Promise.all(promises).then ( results => { 
            const pokemon = results.map( data => ({
                id: data.id,
                name: data.name,
                image: data.sprites['front_default'],
                type: data.types.map((type) => type.type.name).join(', ')
            }));
            displayPokemon(pokemon);
        });
};


const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map ( indivPoke => `
    <li class="poke-card"> 
        <img class="poke-image" src="${indivPoke.image}" alt="${indivPoke.name}" />
        <div class="poke-info">
            <span class="poke-id">${indivPoke.id}</span>
            <h3 class="poke-name">${indivPoke.name}</h3>
            <small class="poke-type">Type: ${indivPoke.type}</small>
        </div>
    </li>
    `).join('');;
    pokedex.innerHTML = pokemonHTMLString;
};
fetchPokemon();