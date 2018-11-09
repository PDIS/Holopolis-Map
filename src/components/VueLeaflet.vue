<template>
  <div class="vue-leaflet">
    <l-map style="width: 100%; height: 600px;" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker">
        <l-popup :content="text"></l-popup>
      </l-marker>
    </l-map> 
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

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
      center: L.latLng(40.40613, -3.6903),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(40.40613, -3.6903),
      text: 'this is a marker'
    }
  }
}
</script>

<style scoped>

</style>