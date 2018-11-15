<template>
  <div class="vue-leaflet">
    <l-map id="map-main-holder" style="width: 100%; height: 100vh; z-index:0; position:fixed" :zoom="zoom" :center="[center.coords.latitude, center.coords.longitude]">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <div v-for="(marker, i) in markers" :key="i">
        <l-marker :lat-lng="[marker.coords.latitude, marker.coords.longitude]" :icon="marker.icon" @click="selectMarker(marker)">
        </l-marker>
      </div>
    </l-map>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card v-if="selectedMarker !== null">
        <v-layout align-center justify-center row fill-height>
          <v-flex xs2>
            <img :src="selectedMarker.logo" height="36" width="31.3" class="ml-3 mt-3">
          </v-flex>
          <v-flex xs10>
            <div class="ml-3 purple--text">{{selectedMarker.conversations[0].datediff}} days left</div>
          </v-flex>
        </v-layout>
        <div v-for="(conversation, i) in selectedMarker.conversations" :key="i">
          <v-card-text>
            {{conversation.topic}}
          </v-card-text>
          <v-divider color="black" class="mx-5" ></v-divider>
          <v-card-actions>
            <v-btn
              color=""
              flat="flat"
              @click="dialog = false"
              :to="{name:'vote', params: {id: conversation.conversation_id}}"
            >
              <v-icon left>check_box</v-icon>
              Vote
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color=""
              flat="flat"
              @click="share = true; shareConversation = conversation"
            >
            <v-icon left>share</v-icon>
              Share
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="share"
      max-width="290"
    >
      <v-card v-if="shareConversation != null">
          <social-sharing
            :url="`https://pol.is/${shareConversation.conversation_id}`"
            :title="`I just spotted this conversation: \n\n${shareConversation.topic}\n\nCheck it out and join me contributing opinions to our city issues!\n\n`"
            :description="`I just spotted this conversation: \n\n${shareConversation.topic}\n\nCheck it out and join me contributing opinions to our city issues!\n\n`"
            :quote="`I just spotted this conversation: \n\n${shareConversation.topic}\n\nCheck it out and join me contributing opinions to our city issues!\n\n`"
            hashtags="polis,democracy"
            twitter-user="polis"
            inline-template
          >
            <v-container grid-list-xs>
              <v-layout row>
                <v-flex xs3>
                  <v-layout align-center justify-center row fill-height>
                    <network network="facebook">
                      <v-icon color="indigo" large>fa-facebook</v-icon>
                    </network>  
                  </v-layout>
                </v-flex>
                <v-flex xs3>
                   <v-layout align-center justify-center row fill-height>
                    <network network="twitter">
                      <v-icon color="blue" large>fa-twitter</v-icon>
                    </network>  
                  </v-layout>
                </v-flex>
                  <v-flex xs3>
                   <v-layout align-center justify-center row fill-height>
                    <network network="telegram">
                      <v-icon color="blue" large>fa-telegram</v-icon>
                    </network>  
                  </v-layout>
                </v-flex>
                  <v-flex xs3>
                   <v-layout align-center justify-center row fill-height>
                    <network network="whatsapp">
                      <v-icon color="green" large>fa-whatsapp</v-icon>
                    </network>  
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout align-end justify-start row fill-height>
                <v-flex xs12>
                  <v-btn flat color="teal" @click="share = false">Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </social-sharing>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { WorldMapPage } from '../models/WorldMapPage';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import vote from '@/components/vote'

const model = new WorldMapPage();

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
      center: model.getMapDefaultCenter(),
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [],
      dialog: false,
      selectedMarker: null,
      shareConversation: null,
      share: false,
    }
  },
  methods: {
    //function that retrieves the position
    showPosition: function(position) {
      this.center = position;
      this.zoom = 15;
    },
    showMarkers: function(markers) {
      this.markers = markers;
    },
    selectMarker: function(marker) {
      model.getMarkerInfo(marker).then(([filledMarker, markers]) => {
        this.markers = markers;
        this.selectedMarker = filledMarker;
        this.selectedMarker.conversations[0].datediff = this.datediff(this.selectedMarker.conversations[0].created)
        
        this.dialog = true;
      })
    },
    datediff: function(timestamp) {
      let currentTime = new Date().getTime();
      var difference = currentTime - timestamp;
      var daysDifference = Math.floor(difference/1000/60/60/24);

      return daysDifference;
    }
  },
  created: function() {
    model.getGpsCenter().then(position => {
      const map = document.getElementById("map-main-holder");
      map.style.height = (+window.innerHeight - 56) + "px";
      map.style.top = "56px";
      this.showPosition(position);
      model.getMapMarkers(position).then(this.showMarkers);
    });
  }
}
</script>

<style scoped>

</style>