const pokedex = document.getElementById('pokedex');

const fetchPokemon = (startPokeCount, endPokeCount) => {
    const promises = [];
    for (let i = startPokeCount; i <=  endPokeCount; i++) {
        console.log(fetchPokemon);
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    };

    Promise.all(promises).then(results => {
        const pokemon = results.map(data => ({
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
    const pokemonHTMLString = pokemon.map(indivPoke => `
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

// On click
$(document).ready(function(){
    $('#kanto').on('click',function(event){
      fetchPokemon(1,151);
      document.getElementById("region_title").innerHTML = "Kanto Region";
      $( ".home-box" ).hide();
    });
    $('#johto').on('click',function(event){ 
      fetchPokemon(152,252);
      document.getElementById("region_title").innerHTML = "Johto Region";
      $( ".home-box" ).hide();
    });
    $('#hoenn').on('click',function(event){
      fetchPokemon(253,386);
      document.getElementById("region_title").innerHTML = "Hoenn Region";
      $( ".home-box" ).hide();
    });
  });