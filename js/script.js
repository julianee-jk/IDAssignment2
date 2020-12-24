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
      $( ".region-box" ).hide();
    });
    $('#johto').on('click',function(event){ 
      fetchPokemon(152,252);
      document.getElementById("region_title").innerHTML = "Johto Region";
      $( ".region-box" ).hide();
    });
    $('#hoenn').on('click',function(event){
      fetchPokemon(253,386);
      document.getElementById("region_title").innerHTML = "Hoenn Region";
      $( ".region-box" ).hide();
    });
    $('#sinnoh').on('click',function(event){
        fetchPokemon(387,493);
        document.getElementById("region_title").innerHTML = "Sinnoh Region";
        $( ".region-box" ).hide();
      });
    $('#unova').on('click',function(event){
        fetchPokemon(494,649);
        document.getElementById("region_title").innerHTML = "Unova Region";
        $( ".region-box" ).hide();
        });
    $('#kalos').on('click',function(event){
        fetchPokemon(650,721);
        document.getElementById("region_title").innerHTML = "Kalos Region";
        $( ".region-box" ).hide();
        });
    $('#alola').on('click',function(event){
        fetchPokemon(722,809);
        document.getElementById("region_title").innerHTML = "Alola Region";
        $( ".region-box" ).hide();
        });
    $('#galar').on('click',function(event){
        fetchPokemon(810,898);
        document.getElementById("region_title").innerHTML = "Galar Region";
        $( ".region-box" ).hide();
        });
  });