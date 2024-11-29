import { Component, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-esperando',
  templateUrl: './esperando.page.html',
  styleUrls: ['./esperando.page.scss'],
})
export class EsperandoPage implements AfterViewInit {
  map: any;
  currentLocationMarker: any;
  viajeData: any;
  watchId: any;

  constructor(
    private geolocation: Geolocation,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.viajeData = navigation.extras.state['viaje'];  
    }
  }

  ngAfterViewInit() {
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ8Igfsv_r5J8xKXacVIUc3Xwcup8U-ws`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.initMap();
    document.body.appendChild(script);
  }

  async initMap() {
    const lastViaje = this.viajeData;

    this.geolocation.getCurrentPosition().then((resp) => {
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      const mapStyles = [
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
            { "color": "rgba(255, 255, 255, 0)" }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            { "color": "#9473B5" }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            { "visibility": "on" }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            { "color": "rgba(255, 255, 255, 0)" }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            { "color": "#d3d3d3" }
          ]
        }
      ];

      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: mapStyles,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false
      };

      const mapElement = document.getElementById('map');
      if (mapElement) {
        this.map = new google.maps.Map(mapElement, mapOptions);

        const icon = {
          url: 'assets/img/1.gif', 
          scaledSize: new google.maps.Size(40, 40), 
          origin: new google.maps.Point(0, 0), 
          anchor: new google.maps.Point(20, 20) 
        };

        this.currentLocationMarker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Ubicación Actual',
          icon: icon 
        });

        this.calculateAndDisplayRoute(lastViaje);
        this.watchPosition();  
      }

    }).catch((error) => {
      console.log('Error obteniendo la ubicación', error);
    });
  }

  calculateAndDisplayRoute(viaje: any) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.map);

    const request = {
      origin: viaje.comunaOrigen,
      destination: viaje.comunaDestino,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
      } else {
        console.log('Error mostrando la ruta', status);
      }
    });
  }

  watchPosition() {
    this.watchId = this.geolocation.watchPosition().subscribe((data) => {
      if ('coords' in data) {
        const latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
        this.currentLocationMarker.setPosition(latLng);
        this.map.setCenter(latLng);
      } else {
        console.error('Error obteniendo la ubicación', data);
      }
    });
  }

  cancelarViaje() {
    if (this.watchId) {
      this.watchId.unsubscribe();  
    }
    console.log('Viaje cancelado');
    this.router.navigate(['/viajes']);
  }
}
