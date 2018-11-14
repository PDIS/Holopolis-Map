<template>
  <div class="vue-leaflet">
    <l-map style="width: 100%; height: 100vh; z-index:0" :zoom="zoom" :center="[center.coords.latitude, center.coords.longitude]">
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
        <img src="@/assets/marker.png" height="36" width="31.3" class="ml-3 mt-3">
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
          <div>
            <network network="facebook">
              <i class="fa fa-fw fa-facebook"></i><v-icon left>share</v-icon>Facebook
            </network>
            <network network="twitter">
              <i class="fa fa-fw fa-twitter"></i><v-icon left>share</v-icon>Twitter
            </network>
            <network network="whatsapp">
              <i class="fa fa-fw fa-whatsapp"></i><v-icon left>share</v-icon>Whatsapp
            </network>
            <network network="telegram">
              <i class="fa fa-telegram"></i><v-icon left>share</v-icon>Telegram
            </network>
          </div>
        </social-sharing>
        <v-btn
          @click="share = false"
        >
          Cancel
        </v-btn>
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
        this.dialog = true;
      })
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