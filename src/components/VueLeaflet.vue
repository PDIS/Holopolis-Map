<template>
  <div class="vue-leaflet">
    <l-map style="width: 100%; height: 600px;" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <div v-for="marker in markers">
        <l-marker :lat-lng="[marker.coords.latitude, marker.coords.longitude]">
          <l-popup :content="marker.text"></l-popup>
        </l-marker>
      </div>
    </l-map> 
  </div>
</template>

<script>
import { MainPage } from '../models/MainPage';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

const model = new MainPage();

const center = model.getMapDefaultCenter();

export default {
  name: 'VueLeaflet',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      zoom: 13,
      center: L.latLng(center.latitude, center.longitude),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: model.getMapMarkers(),
    }
  },
  methods: {
  //function that gets the location and returns it
  getLocation: function() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geo Location not supported by browser");
    }
  },
  //function that retrieves the position
  showPosition: function(position) {
    var location = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    }
    this.center = L.latLng(location)
    console.log(location)
    }
  },
  created: function() {
    //request for location
    this.getLocation();
  }
}
</script>

<style scoped>

</style>