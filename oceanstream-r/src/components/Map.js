import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles.css';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    const tubaraoCoords = [-20.2867, -40.2548];
    mapRef.current = L.map('map').setView(tubaraoCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    const customIcon = L.icon({
      iconUrl: 'mapa-icone.png',
      iconSize: [25, 50],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const markers = [
      { 
        coords: [-20.328167, -40.242500], 
        info: `<div style="display: flex; align-items: center;">
                <div>
                    <b>Boia 04</b><br>
                    Latitude: -20.328167<br>
                    Longitude: -40.242500<br>
                    ADCP - Nortek_awac_1MHz<br>
                    Intervalo de atualização:<br>
                    - Onda: 1 horas<br>
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
                    ADCP - Nortek_awac_1MHz<br>
                    Intervalo de atualização:<br>
                    - Onda: 1 horas<br>
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
                    ADCP - Nortek_awac_1MHz<br>
                    Intervalo de atualização:<br>
                    - Onda: 1 horas<br>
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
                    Marégrafo - LevelTROLL500<br>
                    Intervalo de atualização: 10 minutos
                </div>
                <div>
                    <img src="LevelTROLL500.png" style="width: 100px; height: 100px; margin-left: 10px;">
                </div>
               </div>` 
      }
    ];

    markers.forEach(markerData => {
      const marker = L.marker(markerData.coords, { icon: customIcon }).addTo(mapRef.current);
      marker.bindPopup(markerData.info);

      marker.on('mouseover', function (e) {
        this.openPopup();
      });
      marker.on('mouseout', function (e) {
        this.closePopup();
      });
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return <div id="map" style={{ height: '500px' }}></div>;
}

export default Map;
