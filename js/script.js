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

fetchPokemon();