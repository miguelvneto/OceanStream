const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
})

// -----------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Coordenadas do Porto de Tubarão, Vitória - ES
    var tubaraoCoords = [-20.2867, -40.2548];

    // Inicializar o mapa
    var map = L.map('map').setView(tubaraoCoords, 13); // Coordenadas e nível de zoom

    // Adicionar camada de tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adicionar um marcador no mapa
    var marker = L.marker(tubaraoCoords).addTo(map)
        .bindPopup('Porto de Tubarão.<br> Vitória - ES.')
        .openPopup();
});

// --------------------------------------------------------------------------------------- icones
document.addEventListener('DOMContentLoaded', () => {
    // Coordenadas do Porto de Tubarão, Vitória - ES
    var tubaraoCoords = [-20.2867, -40.2548];

    // Inicializar o mapa
    var map = L.map('map').setView(tubaraoCoords, 13); // Coordenadas e nível de zoom

    // Adicionar camada de tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Função para adicionar ícones personalizados
    function addCustomMarker(coords, iconUrl, popupText) {
        var customIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [38, 38], // tamanho do ícone
            iconAnchor: [19, 38], // ponto do ícone que será ancorado ao marcador
            popupAnchor: [0, -38] // ponto de ancoragem do popup em relação ao ícone
        });

        var marker = L.marker(coords, {icon: customIcon}).addTo(map);
        marker.bindPopup(popupText);

        marker.on('mouseover', function(e) {
            this.openPopup();
        });
        marker.on('mouseout', function(e) {
            this.closePopup();
        });
    }

    // Adicionar marcadores personalizados
    addCustomMarker(tubaraoCoords, 'path/to/icon1.png', 'Informações sobre o ponto 1');
    addCustomMarker([-20.2900, -40.2500], 'Oceanstream\overview2\Nortek_AWAC_1MHz.png', 'Informações sobre o ponto 2');
    addCustomMarker([-20.2950, -40.2600], 'path/to/icon3.png', 'Informações sobre o ponto 3');
});
