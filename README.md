# IDAssignment2
**Interactive Design** - Assignment 2 (Ee Jun Kai Julian) 
Updated as of: (9/1/2021)

# Introduction
This website or mobile application is made to allow anybody be it newcomers or existing Pokémon fans to look up more information about their favourite Pokémon, PokéItems or even the specific Moves to learn more about what it does. In the Pokédex, they will be able to see more about the ID of the Pokémon, the name of the Pokémon, the Type(s) of the Pokémon as well as other relevant information like it's EXP Yield. 

This project makes use of the PokéAPI to retrieve and gather frequently updated Pokémon data.

I decided to come up with this Pokémon Information Center website/application because I am a Pokémon fan myself. I really enjoy the gameplay and art of Pokémon ever since I was younger. Another reason behind this project was because I felt that I did not really have access to a proper program/application that will allow me to simply search up a Pokedex, Movedex and Itemdex all at one place. It is just a simple click and your information is displayed. Overall, I wish to educate more people about the various Pokémon and unique Items that exist, and hopefully spread the fun and joy this awesome franchise offers.
## Design Process

* **Newcomers**
    * The newcomers will be able to look at the various types of Pokémon in the Pokédex of different generations, they will also be able to check out the wide variety of unique items and moves the Pokémon franchise has to offer. Hopefully this will let them to slowly gain more interest towards Pokémon.

* **Pokémon Enthusiasts**
    * The fans will be able to look for their favourite Pokémons and understand more about specific types. This will allow them to improve their understanding of other Pokémons which they can utilize in-game.
    * The fans will also be able to look at the various Pokémon Type advantages and disadvantages. This will allow them to gain extra knowledge on the game which they can use to their advantage in Player-versus-Player combat.
    * Similarly, the fans will be able to access the Movedex & the Itemdex to look up specific information of any Items & Moves they wish to know more about.

**Wireframe Link:**
Click to access the [Website Wireframe](https://drive.google.com/drive/folders/1iIDFmfFIgDDwleMQjQUlXSr9yx-J1_Uf?usp=sharing).
Click to access [Github Pages](https://julianee-jk.github.io/IDAssignment2/).

## Features
These are the current features and pages of my website as well as the additional features I plan to add in the future.

### Existing Features
All the webpages share the same designs for the header page and footer. 

* **Global Features**
    * Navigation bar with Logo
    * Footer with Copyright & source

* **Homepage - Index Page**
    * Home introduction text box
    * Mobile responsiveness for all devices except Galaxy Fold.

* **Pokédex**
    * Pokémon will show depending on the selected region(s).
    * Auto filtering search bar **(Pokémon ID, Name, Type or Abilities)**
    * Popup info menu when clicked on individual Pokémon
        * Pokémon Type
        * Default & Shiny image of Pokémon
        * Pokémon XP Yield
        * Brief description of Pokémon **(Height, Weight, Abilities)**
        * Progress bar in Popup info to display stats
    * Back to top function.
    * Each Pokémon card will have a coloured background based on it's **first** type.
    * Mobile responsiveness for all devices except Galaxy Fold.

* **Itemdex**
    * All items will be displayed.
    * Auto filtering search bar **(Item ID & Name)**
    * Popup info menu when clicked on individual Items
        * Category of the Item **(Standard-Balls, Healing, etc..)**
        * Short description of Item
    * Back to top function.
    * Mobile responsiveness for all devices except Galaxy Fold.

* **Movedex**
    * All moves will be displayed.
    * Auto filtering search bar **(Move ID, Name, Type)**
    * Popup info menu when clicked on individual moves
        * Move type
        * Move damage class **(Physical, Special, Status)**
        * Information of Move **(Power, Accuracy, PP, Priority & Effect Chance - If applicable)**
        * Short description of Move
    * Back to top function.
    * Each Move cards will have a coloured background based on it's type.
    * Mobile responsiveness for all devices except Galaxy Fold.

* **Contact**
    * Enquiry Form
    * Social media links
    * Mobile responsiveness for devices including Galaxy Fold.

### Features to implement
- [ ] Fixed mobile responsiveness for Galaxy Fold.
- [ ] Add evolution chart.

## Technology Used
These are all the tools and languages which I have used to construct this project.
### Tools
* [Visual Studio Code](https://code.visualstudio.com/) → Integrated Development Environment (IDE) used.
* [Adobe XD](https://www.adobe.com/sea/products/xd.html) → To make the wireframes of the website. (Desktop & Mobile).
* [Bootstrap](https://getbootstrap.com/) → To make the responsive navigation bar, icons and more.
* [Adobe Photoshop](https://www.adobe.com/sea/products/photoshop.html) → To edit and modify image sizes, remove backgrounds of images and touch up on them.
### Languages 
* [Hypertext Markup Language (HTML)](https://html.spec.whatwg.org/) → To create the content of the website.
* [Cascading Style Sheets (CSS)](https://www.w3.org/Style/CSS/Overview.en.html) → To style the content of the website.
* [JavaScript](https://www.javascript.com/) → To make the webpage much more interactive, aesthetic with animations as well as to make use of API to retrieve Pokémon information from the PokéAPI.
* [JQuery](https://jquery.com/) → To help simplify the use of JavaScript, HTML manipulation and Event handling.
## Testing
### Browsers Tested

* [Brave](https://brave.com/)
* [Microsoft Edge](https://www.microsoft.com/en-us/edge)
* [Google Chrome](https://www.google.com/chrome/?brand=BNSD&gclsrc=ds&gclsrc=ds)
* [Modzilla Firefox](https://www.mozilla.org/en-US/firefox/new/)
* [Internet Explorer](https://www.microsoft.com/en-us/download/internet-explorer.aspx)
    * JavaScript animations and certain container CSS does not seem to work on this browser.
* [Opera](https://www.opera.com/)

### Mobile Devices Tested

* **Motorola Moto G4**
    * Mobile responsiveness works well on this device.
* **Samsung Galaxy S5**
    * Mobile responsiveness works well on this device.
* **Google Pixel 2**
    * Mobile responsiveness works well on this device.
* **Google Pixel 2 XL**
    * Mobile responsiveness works well on this device.
* **iPhone 5/SE**
    * Mobile responsiveness works well on this device.
* **iPhone 6/7/8**
    * Mobile responsiveness works well on this device.
* **iPhone 6/7/8 Plus**
    * Mobile responsiveness works well on this device.
* **iPhone X**
    * Mobile responsiveness works well on this device.
* **iPad**
    * Mobile responsiveness works well on this device.
* **iPad Pro**
    * Mobile responsiveness works well on this device. 
* **Surface Duo**
    * Mobile responsiveness works well on this device.
* **Samsung Galaxy Fold**
    * Black background of Popup menu does not cover whole screen.

### Validators

* [HTML Validator](https://validator.w3.org/)
* [CSS Validator](https://jigsaw.w3.org/css-validator/)
* [JS & JQuery Validator](https://jshint.com/) → 'Unused' variables when it is used in formatting & undefined variables (if defined, will have error).
## Credits

### Content
1. [PokéAPI](https://Pokéapi.co/) → Pokémon API used to gather data.

1. [PokéAPI Github](https://github.com/PokeAPI/sprites) → Pokémon & Item sprites
### Media & Sources
The following links below are all the links of social medias, images, albums etc.. that I have made use of throughout my website.

**Image Sources:**
[Pokéball Logo (Before Edit)](https://www.pinterest.se/pin/382243087101906111/),
[Pokémon Sprites](https://pokeapi.co/)
[PokéAPI Logo](https://pokeapi.co/)

**Icons**
[Arrow Up](https://icons.getbootstrap.com/),
[Cross](http://www.i2symbol.com/symbols/check)

### Acknowledgements
1. [PokéAPI](https://Pokéapi.co/) → This API has allowed me to gather information of the Pokémon franchise for my website as well as having proper documentation on how to make use of the API.

1. [Build a Pokédex with HTML, CSS & JavaScript](https://www.youtube.com/watch?v=T-VQUKeSU1w) → This YouTube video helped me to understand more about how to make use of the PokéAPI.

1. [Build a Pokédex with HTML, CSS & JavaScript Part 2](https://www.youtube.com/watch?v=L0pPRauLP2E) → This YouTube video helped me to generate a proper popup on click.

1. [PokéDex - JavaScript Tutorial](https://www.youtube.com/watch?v=XL68br6JyYs) → This YouTube video helped me to further improve the design of my PokéDex.

1. [JS Search Bar](https://www.youtube.com/watch?v=wxz5vJ1BWrc&t=1s) → Auto-filtering search bar

1. [Official Pokédex](https://www.Pokémon.com/us/Pokédex/) → The Official Pokémon Pokédex website that inspired me for the Pokédex on my website.

1. [Reactiflux](https://www.reactiflux.com/) → The Reactiflux discord members has helped me a little bit with my code when I am having some trouble.

1. [W3School](https://www.w3schools.com/) → This website has helped me with commands that I had trouble with and also taught me many ways to create interesting HTML, CSS & JavaScript content.

1. [Bootstrap](https://getbootstrap.com/) → Made use of bootstrap templates for web development.

1. My friends who gave me ideas on some website additions. <3