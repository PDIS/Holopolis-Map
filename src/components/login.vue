<template>
  <div>
    <v-btn flat color="teal accent-4" class="headline font-weight-light" :to="{name:'VueLeaflet'}">Login</v-btn>
  </div>
</template>

<script>
import VueLeaflet from '../components/VueLeaflet'
export default {
  components: {
    VueLeaflet
  },
}
</script>

<style>

</style>
