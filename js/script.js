// Create constant of pokedex ID
const pokedex = document.getElementById('pokedex');
// Create constant of searchBar ID
const searchBar = document.getElementById('searchBar');

let pokemon = [];

// Colours of all Pokemon types
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
    ghost: '#ada3bf',
    dark: '#ab9c93',
    steel: '#b8b8d0'
};

const realColors = {
    fire: '#F08030', 
    grass: '#78C850', 
    electric: '#F8D030', 
    water: '#6890F0', 
    ground: '#E0C068', 
    rock: '#B8A038', 
    fairy: '#EE99AC', 
    poison: '#A040A0', 
    bug: '#A8B820', 
    dragon: '#7038F8', 
    psychic: '#F85888', 
    flying: '#A890F0',
    fighting: '#C03028', 
    normal: '#A8A878',
    ice: '#98D8D8',
    ghost: '#705898',
    dark: '#705848',
    steel: '#B8B8D0'
}

// Check every user key input
searchBar.addEventListener('keyup', (e) => {
    // Force user input to lowercase
    const searchTarget = e.target.value.toLowerCase();
    // Search for Pokemon Name & Type (To add ID)
    const filteredPokemons = pokemon.filter((indivPoke) => {
        return (
            indivPoke.name.toLowerCase().includes(searchTarget) || 
            indivPoke.type.toLowerCase().includes(searchTarget) ||
            indivPoke.ability.toLowerCase().includes(searchTarget)
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
            type: data.types.map((type) => type.type.name).join(', '),
            typeColor: data.types.map((type) => 
            `<span style="background-color: ${realColors[type.type.name]}" class="poke-type-name">${type.type.name}</span>`).join(' '),
            ability: data.abilities.map((ability) => ability.ability.name).join(', '),
            stats: data.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(', '),
            weight: data.weight,
            height: data.height,
            // form: data.forms.map((forms) => forms.url[url]).join(', ')
        }));
        displayPokemon(pokemon);
    });
};

// Display Pokemon as HTML String
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map(indivPoke => `
    <li class="poke-card" onclick="selectPokemon(${indivPoke.id})" style="background-color: ${colors[indivPoke.type.split(",")[0]]}">  
        <img class="poke-image" src="${indivPoke.image}" alt="${indivPoke.name}" />
        <div class="poke-info">
            <span class="poke-id">#${indivPoke.id.toString().padStart(3, '0')}</span>
            <h3 class="poke-name">${indivPoke.name}</h3>
            <small class="poke-type">${indivPoke.typeColor}<br>${indivPoke.form}
            </small>
        </div>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

// Select Pokemon ID 
const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const indivPoke = await res.json();
    displayPopup(indivPoke);
}

// Display Pokemon Popup 
const displayPopup = (indivPoke) => {
    const image = indivPoke.sprites['front_default']
    const shinyimage = indivPoke.sprites['front_shiny']
    const type = indivPoke.types.map((type) => type.type.name).join(', ')
    const typeColor = indivPoke.types.map((type) => 
    `<span style="background-color: ${realColors[type.type.name]}" class="poke-type-name">${type.type.name}</span>`).join(' ')
    const ability = indivPoke.abilities.map((ability) => ability.ability.name).join(', ')
    const stats = indivPoke.stats.map((stat) => `<b>${stat.stat.name}</b>: ${stat.base_stat}`).join('<br>')
    const pokemonPopupString = `
    <div class="popup">
            <button class="closeBtn" id="closeBtn" onclick="closePopup()">✖</button>
            <div class="popup-card" style="background-color: ${colors[type.split(',')[0]]}"> 
                <div class="default-shiny-text">
                    <medium>Default</medium>
                    <span class="text-spacing"></span>
                    <medium class="shiny_text">Shiny</medium>
                </div>
                <div class="image-container">
                    <img class="popup-image" src="${image}" alt="${indivPoke.name}">              
                    <img class="popup-image" src="${shinyimage}" alt="${indivPoke.name}_shiny">
                </div>
                <div class="poke-info">
                    <div class="poke-id">#${indivPoke.id.toString().padStart(3, '0')}</div>
                    <h3 class="poke-name">${indivPoke.name}</h3>
                    <div class="poke-type">
                        <small>${typeColor}</small>
                    </div>
                    <small class="poke-details">
                        Abilities: ${ability}<br>
                        Height: ${indivPoke.height/10}m | Weight: ${indivPoke.weight/10}kg
                        <div class="poke-stats">
                            ${stats}<br>
                        </div>
                    </small>
                </div>
            </div>
        </div>
    `;
    pokedex.innerHTML = pokemonPopupString + pokedex.innerHTML;
};

// Close Pokemon Popup 
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};
// Hide search bar as default
$( ".searchWrapper" ).hide();

// On click change region
$(document).ready(function(){
    
    // All regions
    $('#allregions').on('click',function(event){
        fetchPokemon(1,898);
        document.getElementById("region_title").innerHTML = "All Regions";
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