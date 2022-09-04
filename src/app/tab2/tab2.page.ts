/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { ServerServiceService } from '../api/server-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@awesome-cordova-plugins/native-geocoder/ngx';
declare let google;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;
  lat: string;
  long: string;
  autocomplete: { input: string };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GoogleAutocomplete: any;
  markers: any;
  geocoder: any;
  constructor(
    private serverService: ServerServiceService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public zone: NgZone
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder();
    const elem = document.createElement('div');
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: '',
    };
    this.autocompleteItems = [];
    this.markers = [];
  }
  ngOnInit(): void {
    this.loadMap();
  }
  loadMap() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        const latLng = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        const mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
        this.map.addListener('tilesloaded', () => {
          console.log('accuracy', this.map, this.map.center.lat());
          this.getAddressFromCoords(
            this.map.center.lat(),
            this.map.center.lng()
          );
          this.lat = this.map.center.lat();
          this.long = this.map.center.lng();
        });
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }
  getAddressFromCoords(lattitude, longitude) {
    console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };
    this.nativeGeocoder
      .reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = '';
        const responseAddress = [];
        for (const [key, value] of Object.entries(result[0])) {
          if (value.length > 0) {
            responseAddress.push(value);
          }
        }
        responseAddress.reverse();
        for (const value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
      });
  }

  ShowCords() {
    alert('lat' + this.lat + ', long' + this.long);
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  UpdateSearchResults() {
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
    );
  }
  selectSearchResult(item) {
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng,
        };
        const marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    });
  }
  clearMarkers() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i]);
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  GoTo() {
    return (window.location.href =
      'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' +
      this.placeid);
  }
  ClearAutocomplete() {
    this.autocompleteItems = [];
    this.autocomplete.input = '';
  }
}
