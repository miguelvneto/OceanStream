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



// --------------------------------------------------------------------------------------- icones
// document.addEventListener('DOMContentLoaded', () => {
//     // Coordenadas do Porto de Tubarão, Vitória - ES
//     var tubaraoCoords = [-20.2867, -40.2548];

//     // Inicializar o mapa
//     var map = L.map('map').setView(tubaraoCoords, 13); // Coordenadas e nível de zoom

//     // Adicionar camada de tiles do OpenStreetMap
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);

//     // Adicionar ícones personalizados
//     var customIcon = L.icon({
//         iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL da imagem do ícone
//         iconSize: [32, 32], // Tamanho do ícone
//         iconAnchor: [16, 32], // Ponto de ancoragem do ícone (metade da largura e altura)
//         popupAnchor: [0, -32] // Ponto de ancoragem do popup (metade da largura e altura)
//     });

//     // Adicionar marcadores com ícones personalizados
//     var markers = [
//         { coords: [-20.2867, -40.2548], info: 'Porto de Tubarão' },
//         { coords: [-20.285, -40.252], info: 'Boia 04' },
//         { coords: [-20.283, -40.256], info: 'Boia 08' },
//         // Adicione mais marcadores conforme necessário
//     ];

//     markers.forEach(markerData => {
//         var marker = L.marker(markerData.coords, { icon: customIcon }).addTo(map);
//         marker.bindPopup(markerData.info);

//         marker.on('mouseover', function (e) {
//             this.openPopup();
//         });
//         marker.on('mouseout', function (e) {
//             this.closePopup();
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    // Coordenadas do Porto de Tubarão, Vitória - ES
    var tubaraoCoords = [-20.2867, -40.2548];

    // Inicializar o mapa
    var map = L.map('map').setView(tubaraoCoords, 13); // Coordenadas e nível de zoom

    // Adicionar camada de tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adicionar ícone personalizado
    var customIcon = L.icon({
        iconUrl: 'mapa-icone.png', // Caminho relativo do ícone
        iconSize: [25, 50], // Tamanho do ícone
        iconAnchor: [16, 32], // Ponto de ancoragem do ícone (metade da largura e altura)
        popupAnchor: [0, -32] // Ponto de ancoragem do popup (metade da largura e altura)
    });

    // Adicionar marcadores com ícones personalizados
    var markers = [
        { 
            coords: [-20.328167, -40.242500], 
            info: `<div style="display: flex; align-items: center;">
                    <div>
                        <b>Boia 04</b><br>
                        Latitude: -20.328167<br>
                        Longitude: -40.242500<br>
                        ADCP Marca Nortek Modelo AWAC 600 kHz<br>
                        Intervalo de atualização:<br>
                        - Onda: 1 hora<br>
                        - Corrente: 10 minutos
                    </div>
                    <div>
                        <img src="Nortek_AWAC_1MHz.png" style="width: 100px; height: 100px; margin-left: 10px;">
                    </div>
                   </div>` 
        },
        { 
            coords: [-20.308833, -40.248000], 
            info: `<div style="display: flex; align-items: center;">
                    <div>
                        <b>Boia 08</b><br>
                        Latitude: -20.308833<br>
                        Longitude: -40.248000<br>
                        ADCP Marca Nortek Modelo AWAC 600 kHz<br>
                        Intervalo de atualização:<br>
                        - Onda: 1 hora<br>
                        - Corrente: 10 minutos
                    </div>
                    <div>
                        <img src="Nortek_AWAC_1MHz.png" style="width: 100px; height: 100px; margin-left: 10px;">
                    </div>
                   </div>` 
        },
        { 
            coords: [-20.299833, -40.255000], 
            info: `<div style="display: flex; align-items: center;">
                    <div>
                        <b>Boia 10</b><br>
                        Latitude: -20.299833<br>
                        Longitude: -40.255000<br>
                        ADCP Marca Nortek Modelo AWAC 600 kHz<br>
                        Intervalo de atualização:<br>
                        - Onda: 1 hora<br>
                        - Corrente: 10 minutos
                    </div>
                    <div>
                        <img src="Nortek_AWAC_1MHz.png" style="width: 100px; height: 100px; margin-left: 10px;">
                    </div>
                   </div>` 
        },
        { 
            coords: [-20.288333, -40.243333], 
            info: `<div style="display: flex; align-items: center;">
                    <div>
                        <b>Marégrafo</b><br>
                        Latitude: -23.000000<br>
                        Longitude: -44.031667<br>
                        InSitu Modelo Level Troll 500<br>
                        Intervalo de atualização: 10 minutos
                    </div>
                    <div>
                        <img src="LevelTROLL500.png" style="width: 100px; height: 100px; margin-left: 10px;">
                    </div>
                   </div>` 
        },
        { 
            coords: [-20.300846, -40.240460], 
            info: `<div style="display: flex; align-items: center;">
                    <div>
                        <b>Estação Meteorológica</b><br>
                        Latitude: -20.300846<br>
                        Longitude: -40.240460<br>
                        Hobo Modelo RX3000 com Sensores InSet <br>
                        Intervalo de atualização: 10 minutos
                    </div>
                    <div>
                        <img src="estacao-m.png" style="width: 100px; height: 150px; margin-left: 10px;">
                    </div>
                   </div>` 
        },
        { 
            coords: [-20.293416, -40.247374], 
            info: `<div style="display: flex; align-items: center;">
                    <div>
                        <b>Ondógrafo - TPD</b><br>
                        Latitude: -20.293416<br>
                        Longitude: -40.247374<br>
                        Ondógrafo Marca VegaPuls Modelo C23<br>
                        Intervalo de atualização: 30 minutos
                    </div>
                    <div>
                        <img src="F-VEGAPULS-C23.png" style="width: 100px; height: 150px; margin-left: 10px;">
                    </div>
                   </div>` 
        }
        ,
        { 
            coords: [-20.285927, -40.247399], 
            info: `<div style="display: flex; align-items: center;">
                    <div>
                        <b>Ondógrafo - Píer II</b><br>
                        Latitude: -20.285927<br>
                        Longitude: -40.247399<br>
                        Ondógrafo Marca VegaPuls Modelo C23<br>
                        Intervalo de atualização: 30 minutos
                    </div>
                    <div>
                        <img src="F-VEGAPULS-C23.png" style="width: 100px; height: 150px; margin-left: 10px;">
                    </div>
                   </div>` 
        },
        { 
            coords: [-20.285315, -40.245574], 
            info: `<div style="display: flex; align-items: center;">
                    <div>
                        <b>Ondógrafo - TGL</b><br>
                        Latitude: -20.285315<br>
                        Longitude: -40.245574<br>
                        Ondógrafo Marca VegaPuls Modelo C23<br>
                        Intervalo de atualização: 30 minutos
                    </div>
                    <div>
                        <img src="F-VEGAPULS-C23.png" style="width: 100px; height: 150px; margin-left: 10px;">
                    </div>
                   </div>` 
        },
        { 
            coords: [-20.297908, -40.235228], 
            info: `<div style="display: flex; align-items: center;">
                    <div>
                        <b>Ondógrafo - TPM</b><br>
                        Latitude: -20.297908<br>
                        Longitude: -40.235228<br>
                        Ondógrafo Marca VegaPuls Modelo C23<br>
                        Intervalo de atualização: 30 minutos
                    </div>
                    <div>
                        <img src="F-VEGAPULS-C23.png" style="width: 100px; height: 150px; margin-left: 10px;">
                    </div>
                   </div>` 
        }
        
        
    ];

    markers.forEach(markerData => {
        var marker = L.marker(markerData.coords, { icon: customIcon }).addTo(map);
        marker.bindPopup(markerData.info);

        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
    });

    markers.forEach(markerData => {
        var marker = L.marker(markerData.coords, { icon: customIcon }).addTo(map);
        marker.bindPopup(markerData.info);

        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        });
    });
});