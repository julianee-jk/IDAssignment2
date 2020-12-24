// Create constant of pokedex ID
const pokedex = document.getElementById('pokedex');
// Create constant of searchBar ID
const searchBar = document.getElementById('searchBar');
let pokemon = [];

const colors = {
    fire: '#ffcccc', 
    grass: '#DEFDE0', 
    electric: '#FCF7DE', 
    water: '#DEF3FD', 
    ground: '#e6d7ae', 
    rock: '#dbd4b4', 
    fairy: '#fceaff', 
    poison: '#f5d3f5', 
    bug: '#c3d1ba', 
    dragon: '#97b3e6', 
    psychic: '#ffdeed', 
    flying: '#F5F5F5',
    fighting: '#e6c1ae', 
    normal: '#F5F5F5',
    ice: '#b4d9d9',
    ghost: '#a697bf',
    dark: '#ab9c93',
    steel: '#b8b8d0'
};

// Check every user key input
searchBar.addEventListener('keyup', (e) => {
    // Force user input to lowercase
    const searchTarget = e.target.value.toLowerCase();
    // Search for Pokemon Name & Type (To add ID)
    const filteredPokemons = pokemon.filter((indivPoke) => {
        return (
            indivPoke.name.toLowerCase().includes(searchTarget) || 
            indivPoke.type.toLowerCase().includes(searchTarget)
        );
    });
    displayPokemon(filteredPokemons);
});

// Fetch Pokemon according to region
const fetchPokemon = (startPokeCount, endPokeCount) => {
    const promises = [];
    for (let i = startPokeCount; i <=  endPokeCount; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
    };

    // Make use of Promise.All to load Pokedex faster
    Promise.all(promises).then(results => {
        pokemon = results.map(data => ({
            id: data.id,
            name: data.name,
            image: data.sprites['front_default'],
            ability: data.abilities.map((ability) => ability.ability.name).join(', '),
            type: data.types.map((type) => type.type.name).join(', '),
        }));
        displayPokemon(pokemon);
    });
};

// Display Pokemon as HTML String
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(indivPoke => `
    <li class="poke-card" style="background-color: ${colors[indivPoke.type.split(",")[0]]}">  
        <img class="poke-image" src="${indivPoke.image}" alt="${indivPoke.name}" />
        <div class="poke-info">
            <span class="poke-id">#${indivPoke.id.toString().padStart(3, '0')}</span>
            <h3 class="poke-name">${indivPoke.name}</h3>
            <small class="poke-type">Type: ${indivPoke.type}<br>
            Abilities: ${indivPoke.ability}
            </small>
        </div>
    </li>
    `).join('');;
    pokedex.innerHTML = pokemonHTMLString;
};

let cards = document.getElementsByClassName("poke-card");
for (let i = 1; i <= cards.length; i++){
    let type = 'fire';/* get one of the pokemon types here */
    console.log("card color");
    cards[i].style.backgroundColor = colors[type];
};

// Hide search bar as default
$( ".searchWrapper" ).hide();

// On click change region
$(document).ready(function(){
    
    // All regions
    $('#allregions').on('click',function(event){
        fetchPokemon(1,898);
        document.getElementById("region_title").innerHTML = "Kanto Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper .box" ).show();
      });
    // Kanto Region (Gen 1)
    $('#kanto').on('click',function(event){
      fetchPokemon(1,151);
      document.getElementById("region_title").innerHTML = "Kanto Region";
      $( ".region-box" ).hide();
      $( ".searchWrapper" ).show();
    });
    // Johto Region (Gen 2)
    $('#johto').on('click',function(event){ 
      fetchPokemon(152,251);
      document.getElementById("region_title").innerHTML = "Johto Region";
      $( ".region-box" ).hide();
      $( ".searchWrapper" ).show();
    });
    // Hoenn Region (Gen 3)
    $('#hoenn').on('click',function(event){
      fetchPokemon(252,386);
      document.getElementById("region_title").innerHTML = "Hoenn Region";
      $( ".region-box" ).hide();
      $( ".searchWrapper" ).show();
    });
    // Sinnoh Region (Gen 4)
    $('#sinnoh').on('click',function(event){
        fetchPokemon(387,493);
        document.getElementById("region_title").innerHTML = "Sinnoh Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper" ).show();
      });
    // Unova Region (Gen 5)
    $('#unova').on('click',function(event){
        fetchPokemon(494,649);
        document.getElementById("region_title").innerHTML = "Unova Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper" ).show();
        });
    // Kalos Region (Gen 6)
    $('#kalos').on('click',function(event){
        fetchPokemon(650,721);
        document.getElementById("region_title").innerHTML = "Kalos Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper" ).show();
        });
    // Alola Region (Gen 7)
    $('#alola').on('click',function(event){
        fetchPokemon(722,809);
        document.getElementById("region_title").innerHTML = "Alola Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper" ).show();
        });
    // Galar Region (Gen 8)
    $('#galar').on('click',function(event){
        fetchPokemon(810,898);
        document.getElementById("region_title").innerHTML = "Galar Region";
        $( ".region-box" ).hide();
        $( ".searchWrapper" ).show();
        });
  });
