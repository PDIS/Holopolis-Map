<template>
  <v-carousel hide-controls :height="clientHeight">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          src: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/localize.png?raw=true'
        },
        {
          src: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/discover.png?raw=true'
        },
        {
          src: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/vote.png?raw=true'
        },
        {
          src: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/contribute.png?raw=true'
        },
        {
          src: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/learning.png?raw=true'
        }
      ],
      clientHeight: '',
    }
  },
  created: function() {
    this.clientHeight =   `${document.documentElement.clientHeight}`
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}` + 'px';
    };
  },
  /* mounted(){
      this.clientHeight =   `${document.documentElement.clientHeight}`
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}` + 'px';
      };
    },
    watch: {
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
    methods:{
      changeFixed(clientHeight){  
        console.log(clientHeight);
        this.$refs.homePage.style.height = clientHeight+'px';

      },
    } */
}
</script>

<style>

</style>
