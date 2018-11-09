<template>
  <div class="vue-leaflet">
    <l-map style="width: 100%; height: 600px; z-index:0" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <div v-for="marker in markers">
        <l-marker :lat-lng="[marker.coords.latitude, marker.coords.longitude]" @click="sheet = true">
          <l-popup :content="marker.name"></l-popup>
        </l-marker>
      </div>
    </l-map>
    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-subheader>HOLA!!!</v-subheader>
        <v-list-tile
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false"
        >
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <img
                :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`"
                :alt="tile.title"
              >
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
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
      center: L.latLng(center.coords.latitude, center.coords.longitude),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [],
      sheet: false,
      tiles: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' }
      ]
    }
  },
  methods: {
    //function that retrieves the position
    showPosition: function(position) {
      const location = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      };
      this.center = L.latLng(location);
      this.zoom = 15;
    },
    showMarkers: function(markers) {
      this.markers = markers;
    },
  },
  created: function() {
    model.getGpsCenter().then(position => {
      this.showPosition(position);
      model.getMapMarkers(location).then(this.showMarkers);
    });
  }
}
</script>

<style scoped>

</style>