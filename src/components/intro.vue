<template>
  <div>
    <v-btn fixed right top flat color="cyan" style="z-index:100" large to="index" exact>
      skip
    </v-btn>
    <v-carousel :height="clientHeight" hide-delimiters>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
  </div>
    <!-- <v-tabs
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"
    >
      <v-tab
        v-for="item in items"
        :key="item.src"
        ripple
        v-if="hide"
      >
      </v-tab>
      <v-tab-item
        v-for="item in items"
        :key="item.src"
      >
        <v-card flat>
          <img :src="item.src">
        </v-card>
      </v-tab-item>
    </v-tabs> -->
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'LOCALIZE',
          src: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/localize.png?raw=true'
        },
        {
          title: 'DISCOVER',
          src: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/discover.png?raw=true'
        },
        {
          title: 'VOTE',
          src: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/vote.png?raw=true'
        },
        {
          title: 'CONTRIBUTE',
          src: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/contribute.png?raw=true'
        },
        {
          title: 'LEARNING',
          src: 'https://github.com/PDIS/Holopolis-Map/blob/master/src/assets/learning.png?raw=true'
        }
      ],
      clientHeight: '',
      e1: 0,
      active: null,
    }
  },
  created: function() {
    this.clientHeight =   `${document.documentElement.clientHeight}`
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}` + 'px';
    };
    this.hide = false
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
