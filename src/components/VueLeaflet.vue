<template>
  <div class="vue-leaflet">
    <l-map style="width: 100%; height: 100vh; z-index:0" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <div v-for="marker in markers" :key="marker.id">
        <l-marker :lat-lng="[marker.coords.latitude, marker.coords.longitude]" @click="selectMarker(marker)">
        </l-marker>
      </div>
    </l-map>
    <!-- <v-bottom-sheet v-model="sheet">
        <v-list>
          <v-subheader>{{selectedMarker.questions[0].title}}</v-subheader>
          <v-list-tile
            key="Vote"
            @click="sheet = false"
             :to="{name:'vote', params: {id:selectedMarker.questions[0].id}}"
          >
              <v-list-tile-avatar>
                <v-avatar size="32px" tile>
                  <img
                    src="https://cdn.vuetifyjs.com/images/bottom-sheets/keep.png"
                    alt="Vote"
                  >
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-title>Vote</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            key="Share"
            @click="sheet = false"
            :to="{name:'share', params: {id:selectedMarker.questions[0].id}}"
          >
        
              <v-list-tile-avatar>
                <v-avatar size="32px" tile>
                  <img
                    src="https://cdn.vuetifyjs.com/images/bottom-sheets/messenger.png"
                    alt="Share"
                  >
                </v-avatar>
              </v-list-tile-avatar>
              <v-list-tile-title>Share</v-list-tile-title>
          </v-list-tile>
        </v-list>
    </v-bottom-sheet> -->
  </div>
</template>

<script>
import { MapPage } from '../models/MapPage';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import vote from '@/components/vote'

const model = new MapPage();

const center = model.getMapDefaultCenter();

export default {
  name: 'VueLeaflet',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    vote
  },
  data () {
    return {
      zoom: 13,
      center: L.latLng(center.coords.latitude, center.coords.longitude),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [],
      sheet: false,
      selectedMarker: {
        name: 'UNSELECTED',
        questions: [
            {
                title: 'UNSELECTED!',
                type: 'unselected',
                polis_link: 'http://wrong-link'
            },
        ],
      }
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
    selectMarker: function(marker) {
      this.sheet = true;
      this.selectedMarker = marker;
    },
  },
  created: function() {
    model.getGpsCenter().then(position => {
      this.showPosition(position);
      model.getMapMarkers(position).then(this.showMarkers);
    });
  }
}
</script>

<style scoped>

</style>