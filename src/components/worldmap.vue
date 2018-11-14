<template>
  <div class="vue-leaflet">
    <l-map style="width: 100%; height: 100vh; z-index:0" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <div v-for="marker in markers" :key="marker.id">
        <l-marker :lat-lng="[marker.coords.latitude, marker.coords.longitude]" :icon="marker.icon" @click="selectMarker(marker)">
        </l-marker>
      </div>
    </l-map>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <img src="@/assets/marker.png" height="36" width="31.3" class="ml-3 mt-3">
        <v-card-text>
          {{selectedMarker.questions[0].title}}
        </v-card-text>
        <v-divider color="black" class="mx-5" ></v-divider>
        <v-card-actions>
          <v-btn
            color=""
            flat="flat"
            @click="dialog = false"
            :to="{name:'vote', params: {id: selectedMarker.questions[0].id}}"
          >
          <v-icon left>check_box</v-icon>
            Vote
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color=""
            flat="flat"
            @click="dialog = false"
            :to="{name:'share', params: {id:selectedMarker.questions[0].id}}"
          >
          <v-icon left>share</v-icon>
            Share
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import { WorldMapPage } from '../models/WorldMapPage';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import vote from '@/components/vote'

const model = new WorldMapPage();

const center = model.getMapDefaultCenter();

export default {
  name: 'worldmap',
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
      dialog: false,
      selectedMarker: {
        name: 'UNSELECTED',
        questions: [
            {
                id: 3,
                title: 'UNSELECTED!',
                type: 'unselected',
                polis_link: 'http://wrong-link'
            },
        ],
      },
      myIcon: L.icon({
        iconUrl: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/marker.png?raw=true',
        iconSize: [31.3, 36],
      })
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
      this.dialog = true;
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