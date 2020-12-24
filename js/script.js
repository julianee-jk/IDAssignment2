const pokedex = document.getElementById('pokedex');
const searchBar = document.getElementById('searchBar');
let pokemon = [];

searchBar.addEventListener('keyup', (e) => {
    const searchTarget = e.target.value.toLowerCase();

    const filteredPokemons = pokemon.filter((indivPoke) => {
        return (
            indivPoke.name.toLowerCase().includes(searchTarget) || 
            indivPoke.type.toLowerCase().includes(searchTarget)
        );
    });
    displayPokemon(filteredPokemons);
});

const fetchPokemon = (startPokeCount, endPokeCount) => {
    const promises = [];
    for (let i = startPokeCount; i <=  endPokeCount; i++) {
        console.log(fetchPokemon);
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    };

    Promise.all(promises).then(results => {
        pokemon = results.map(data => ({
            id: data.id,
            name: data.name,
            image: data.sprites['front_default'],
            ability: data.abilities.map((ability) => ability.ability.name).join(', '),
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
            <span class="poke-id">${indivPoke.id.toString().padStart(3, '0')}</span>
            <h3 class="poke-name">${indivPoke.name}</h3>
            <small class="poke-type">Type: ${indivPoke.type}<br>
            Abilities: ${indivPoke.ability}
            </small>
        </div>
    </li>
    `).join('');;
    pokedex.innerHTML = pokemonHTMLString;
};

$( ".searchWrapper" ).hide();
// On click
$(document).ready(function(){
    $('#allregions').on('click',function(event){
        fetchPokemon(1,898);
        document.getElementById("region_title").innerHTML = "Kanto Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper .box" ).show();
      });
    $('#kanto').on('click',function(event){
      fetchPokemon(1,151);
      document.getElementById("region_title").innerHTML = "Kanto Region";
      $( ".region-box" ).hide();
      $( ".searchWrapper" ).show();
    });
    $('#johto').on('click',function(event){ 
      fetchPokemon(152,252);
      document.getElementById("region_title").innerHTML = "Johto Region";
      $( ".region-box" ).hide();
      $( ".searchWrapper" ).show();
    });
    $('#hoenn').on('click',function(event){
      fetchPokemon(253,386);
      document.getElementById("region_title").innerHTML = "Hoenn Region";
      $( ".region-box" ).hide();
      $( ".searchWrapper" ).show();
    });
    $('#sinnoh').on('click',function(event){
        fetchPokemon(387,493);
        document.getElementById("region_title").innerHTML = "Sinnoh Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper" ).show();
      });
    $('#unova').on('click',function(event){
        fetchPokemon(494,649);
        document.getElementById("region_title").innerHTML = "Unova Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper" ).show();
        });
    $('#kalos').on('click',function(event){
        fetchPokemon(650,721);
        document.getElementById("region_title").innerHTML = "Kalos Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper" ).show();
        });
    $('#alola').on('click',function(event){
        fetchPokemon(722,809);
        document.getElementById("region_title").innerHTML = "Alola Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper" ).show();
        });
    $('#galar').on('click',function(event){
        fetchPokemon(810,898);
        document.getElementById("region_title").innerHTML = "Galar Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper" ).show();
        });
  });