<template>
  <div>
    <v-btn flat color="teal accent-4" class="headline font-weight-light" :to="{name:'worldmap'}">Login</v-btn>
  </div>
</template>

<script>
import worldmap from '../components/worldmap'
export default {
  components: {
    worldmap
  },
}
</script>

<style>

</style>
