// Create constant of page IDs
const pokedex = document.getElementById('pokedex');
const itemdex = document.getElementById('itemdex');
const movedex = document.getElementById('movedex');
// Create constant of searchBar ID
const searchBar = document.getElementById('searchBar');
const searchBarItems = document.getElementById('searchBarItems');
//Get the button
const topButton = document.getElementById("topBtn");

let pokemon = [];

// Lighter colours of all Pokemon types
const colors = {
    fire: '#ffcccc', grass: '#DEFDE0', electric: '#FCF7DE', water: '#DEF3FD', ground: '#e6d7ae', 
    rock: '#dbd4b4', fairy: '#fceaff', poison: '#f5d3f5', bug: '#c3d1ba', dragon: '#97b3e6', 
    psychic: '#ffdeed', flying: '#e1d7fc', fighting: '#e6c1ae', normal: '#F5F5F5', ice: '#d5f7f7',
    ghost: '#ada3bf', dark: '#ab9c93', steel: '#b8b8d0'
};

// Original colours of all Pokemon Types
const realColors = {
    fire: '#F08030', grass: '#78C850', electric: '#F8D030', water: '#6890F0', ground: '#E0C068', 
    rock: '#B8A038', fairy: '#EE99AC', poison: '#A040A0', bug: '#A8B820', dragon: '#7038F8', 
    psychic: '#F85888', flying: '#A890F0',fighting: '#C03028', normal: '#A8A878',ice: '#98D8D8',
    ghost: '#705898',dark: '#705848',steel: '#B8B8D0'
}

// Colours for Damage Classes
const dmgColors = {
    physical: '#e86458', special: '#4f5870', status: '#8c888c'
}

// Function to check if ID is in page
function isInPage(node) {
    return (node === document.body) ? false : document.body.contains(node);
  }

// -------------------------------------------- SEARCH BAR --------------------------------------------
// Check every user key input
searchBar.addEventListener('keyup', (e) => {
    // Force user input to lowercase
    const searchTarget = e.target.value.toLowerCase();
    const searchTarget2 = e.target.value;

    if (isInPage(pokedex)) {
        // Search for Pokemon Name & Type (To add ID)
        const filteredPokemons = pokemon.filter((indivPoke) => {
            return (
                indivPoke.name.toLowerCase().includes(searchTarget) || 
                indivPoke.type.toLowerCase().includes(searchTarget) ||
                indivPoke.ability.toLowerCase().includes(searchTarget) ||
                indivPoke.id == searchTarget2
            );
        });
        displayPokemon(filteredPokemons);
    }  
    if (isInPage(itemdex)) {
        // Search for Item ID & Name
        const filteredItems = pokeItem.filter((indivItem) => {
            return (
                indivItem.name.toLowerCase().includes(searchTarget) || 
                indivItem.id == searchTarget2
            );
        });
        displayItem(filteredItems);
    }

    if (isInPage(movedex)) {
        // Search for Move ID, Name & Type
        const filteredMoves = pokeMove.filter((indivMove) => {
            return (
                indivMove.name.toLowerCase().includes(searchTarget) || 
                indivMove.type.name.toLowerCase().includes(searchTarget) ||
                indivMove.id == searchTarget2
            );
        });
        displayMove(filteredMoves);
    }
});
// -------------------------------------------- ITEMS --------------------------------------------
// Fetch Items
const fetchItems = async () => {
    const url = `https://pokeapi.co/api/v2/item?limit=954`;
    const res = await fetch(url);
    const data = await res.json();
    pokeItem = data.results.map( (result, index) => 
    ({
        ...result,
        id: index + 1,
        name: result.name,
        // image: result.sprites['default']
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${result.name}.png`
    }));
    displayItem(pokeItem);
};

// Display Item as HTML String
const displayItem = (pokeitem) => {
    const itemHTMLString = pokeitem.map(indivItem => `
    <li class="poke-card" onclick="selectItem(${indivItem.id})">  
        <img class="poke-image" src="${indivItem.image}" alt="${indivItem.name}" />
        <div class="poke-info">
            <span class="poke-id">#${indivItem.id.toString().padStart(3, '0')}</span>
            <h3 class="poke-name">${indivItem.name}</h3>
            <div class="clickmore-text">Click for more</div>
        </div>
    </li>`).join('');
    itemdex.innerHTML = itemHTMLString;
};

// Select Item ID 
const selectItem = async (id) => {
    const url = `https://pokeapi.co/api/v2/item/${id}`;
    const res = await fetch(url);
    const indivItem = await res.json();
    displayItemPopup(indivItem);
}

// Display Item Popup 
const displayItemPopup = (indivItem) => {
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${indivItem.name}.png`
    const effect = indivItem.effect_entries.map((effect) => effect.short_effect)
    const category = indivItem.category.name
    const itemPopupString = `
    <div class="popup">
        <button class="closeBtn" id="closeBtn" onclick="closePopup()">✖</button>
        <div class="popup-card"> 
            <div class="popup-image-container">
                <img class="item-popup-image" src="${image}" alt="${indivItem.name}">              
            </div>
            <div class="poke-popup-info">
                <div class="poke-id">#${indivItem.id.toString().padStart(3, '0')}</div>
                <h3 class="poke-name">${indivItem.name}</h3>
                <div class="poke-item-details">
                    <b>Category:</b> <span style="text-transform: capitalize">${category}</span><br>
                    ${effect}
                </div>
            </div>
        </div>
    </div>`;
    itemdex.innerHTML = itemPopupString + itemdex.innerHTML;
};
// -------------------------------------------- MOVES --------------------------------------------

// Fetch Moves
const fetchMoves = async () => {
    const url = `https://pokeapi.co/api/v2/move?limit=813`;
    const res = await fetch(url);
    const data = await res.json();
    pokeMove = await Promise.all(
      data.results.map(async (result, index) => {
        const moveDetailsResult = await fetch(result.url);
        const moveDetailsJSON = await moveDetailsResult.json();
        return {
          ...moveDetailsJSON,
          id: index + 1,
          name: result.name,
        };
      })
    );
    displayMove(pokeMove)
  };

// Display Move as HTML String
const displayMove = (pokeMove) => {
    const moveHTMLString = pokeMove.map(indivMove => `
    <li class="poke-card" onclick="selectMove(${indivMove.id})" style="background-color: ${colors[indivMove.type.name]}">  
        <div class="poke-info">
            <h3 class="poke-name">${indivMove.name}</h3>
            <span class="poke-id">#${indivMove.id.toString().padStart(3, '0')}</span>
            <div class="poke-type">
                <small style="background-color: ${realColors[indivMove.type.name]}" class="poke-type-name">${indivMove.type.name}</small>
            </div>   
            <div class="clickmore-text">Click for more</div>
        </div>
    </li>`).join('');
    movedex.innerHTML = moveHTMLString;
};

// Select Move ID 
const selectMove = async (id) => {
    const url = `https://pokeapi.co/api/v2/move/${id}`;
    const res = await fetch(url);
    const indivMove = await res.json();
    displayMovePopup(indivMove);
}

// Display Move Popup 
const displayMovePopup = (indivMove) => {
    const accuracy = indivMove.accuracy
    const type = indivMove.type.name
    const pp = indivMove.pp
    const power = indivMove.power
    const effect_chance = indivMove.effect_chance
    const priority = indivMove.priority
    const damage_class = indivMove.damage_class.name
    const effect = indivMove.effect_entries.map((effect) => effect.short_effect)
    const movePopupString = `
    <div class="popup">
        <button class="closeBtn" id="closeBtn" onclick="closePopup()">✖</button>
        <div class="popup-card" style="background-color: ${colors[type]}"> 
            <div class="poke-popup-info">
                <h3 class="poke-name">${indivMove.name}</h3>
                <div class="poke-id">#${indivMove.id.toString().padStart(3, '0')}</div>
                <div class="poke-type">
                    <small style="background-color: ${realColors[type]}" class="poke-type-name">${type}</small>
                </div> 
                <div class="poke-item-details">
                    <div class="damage-cat">
                        <span style="background-color: ${dmgColors[damage_class]}" class="poke-type-name">${damage_class}</span>
                    </div>
                    <b>Power</b>: ${power}<br><b>Accuracy</b>: ${accuracy}<br><b>PP</b>: ${pp}<br><b>Priority</b>: ${priority}<br>
                    <b>Effect Chance:</b> ${effect_chance}<br><span style="color: #cc2543">${effect}</span>
                </div>
            </div>
        </div>
    </div>`;
    movedex.innerHTML = movePopupString + movedex.innerHTML;
};
// -------------------------------------------- POKEMON --------------------------------------------
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
            height: data.height
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
            <small class="poke-type">${indivPoke.typeColor}</small>
            <div class="clickmore-text">Click for more</div>
        </div>
    </li>`).join('');
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
    const stats = indivPoke.stats.map((stat) => `
        <div class="progress-box">
            <span class="progress-label" style="text-align: right">${stat.stat.name}:</span>
            <div class="progress"> 
                <span class="progress-bar progress-bar-animated progress-bar-striped" role="progressbar" style="width: ${stat.base_stat/1.8}%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                ${stat.base_stat}
                </span>
            </div>
        </div>
    `).join('<div class="poke-stats-bar"></div>')
    const pokemonPopupString = `
    <div class="popup">
        <button class="closeBtn" id="closeBtn" onclick="closePopup()">✖</button>
        <div class="popup-card" style="background-color: ${colors[type.split(',')[0]]}"> 
            <div class="default-shiny-text">
                <medium>Default</medium>
                <span class="text-spacing"></span>
                <medium class="shiny_text">Shiny</medium>
            </div>
            <div class="popup-image-container">
                <img class="popup-image" src="${image}" alt="${indivPoke.name}">              
                <img class="popup-image" src="${shinyimage}" alt="${indivPoke.name}_shiny">
            </div>
            <div class="poke-popup-info">
                <div class="poke-id">#${indivPoke.id.toString().padStart(3, '0')}</div>
                <h3 class="poke-name">${indivPoke.name}</h3>
                <div class="poke-type">
                    <small>${typeColor}</small>
                </div>
                <small class="poke-details">
                    <b>Abilities:</b> ${ability}<br>
                    <b>Height:</b> ${indivPoke.height/10}m | <b>Weight:</b> ${indivPoke.weight/10}kg
                    <div class="poke-stats">
                        ${stats}<br>
                    </div>
                </small>
            </div>
        </div>
    </div>`;
    pokedex.innerHTML = pokemonPopupString + pokedex.innerHTML;
};


// Close Pokemon Popup 
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};


// On click change region
$(document).ready(function(){
    if (isInPage(pokedex)) {
        // Hide search bar as default
        $( ".searchWrapper" ).hide();
    }
    else if (isInPage(itemdex)) {
        fetchItems();
        $( ".searchWrapper" ).show();
    }
    else if (isInPage(movedex)){
        fetchMoves();
        $( ".searchWrapper" ).show();
    }
    else {
        $( ".searchWrapper" ).hide();
    }
    // All regions
    $('#allregions').on('click',function(event){
        fetchPokemon(1,898);
        document.getElementById("region_title").innerHTML = "All Regions";
        $( ".maintext-box" ).hide();
        $( ".searchWrapper .box" ).show();
      });
    // Kanto Region (Gen 1)
    $('#kanto').on('click',function(event){
      fetchPokemon(1,151);
      document.getElementById("region_title").innerHTML = "Kanto Region";
      $( ".maintext-box" ).hide();
      $( ".searchWrapper" ).show();
    });
    // Johto Region (Gen 2)
    $('#johto').on('click',function(event){ 
      fetchPokemon(152,251);
      document.getElementById("region_title").innerHTML = "Johto Region";
      $( ".maintext-box" ).hide();
      $( ".searchWrapper" ).show();
    });
    // Hoenn Region (Gen 3)
    $('#hoenn').on('click',function(event){
      fetchPokemon(252,386);
      document.getElementById("region_title").innerHTML = "Hoenn Region";
      $( ".maintext-box" ).hide();
      $( ".searchWrapper" ).show();
    });
    // Sinnoh Region (Gen 4)
    $('#sinnoh').on('click',function(event){
        fetchPokemon(387,493);
        document.getElementById("region_title").innerHTML = "Sinnoh Region";
        $( ".maintext-box" ).hide();
        $( ".searchWrapper" ).show();
      });
    // Unova Region (Gen 5)
    $('#unova').on('click',function(event){
        fetchPokemon(494,649);
        document.getElementById("region_title").innerHTML = "Unova Region";
        $( ".maintext-box" ).hide();
        $( ".searchWrapper" ).show();
        });
    // Kalos Region (Gen 6)
    $('#kalos').on('click',function(event){
        fetchPokemon(650,721);
        document.getElementById("region_title").innerHTML = "Kalos Region";
        $( ".maintext-box" ).hide();
        $( ".searchWrapper" ).show();
        });
    // Alola Region (Gen 7)
    $('#alola').on('click',function(event){
        fetchPokemon(722,809);
        document.getElementById("region_title").innerHTML = "Alola Region";
        $( ".maintext-box" ).hide();
        $( ".searchWrapper" ).show();
        });
    // Galar Region (Gen 8)
    $('#galar').on('click',function(event){
        fetchPokemon(810,898);
        document.getElementById("region_title").innerHTML = "Galar Region";
        $( ".maintext-box" ).hide();
        $( ".searchWrapper" ).show();
        });
  });

// When the user scrolls down 150px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}