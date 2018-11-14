<template>
  <v-app>
    <!-- <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    > -->
     <!--  <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list> -->
    <!-- </v-navigation-drawer> -->
    <v-toolbar
      app
      :clipped-left="clipped"
      color="teal accent-2"
      align-center
      v-if="toolbar"
    >
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
<!--       <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn> -->
       <v-layout align-center justify-space-between row fill-height>
        <v-btn icon @click.native="showinfo()">
          <v-icon large>info</v-icon>
        </v-btn>
        <v-btn flat to="/index" exact active-class="">
        <img src="@/assets/logo.png" height="40" width="143.2">
        </v-btn>
        <v-btn icon to="/camera" exact>
          <v-icon large>photo_camera</v-icon>
        </v-btn>
      </v-layout>
  <!--     <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title> -->
    </v-toolbar>
    <v-content>
      <v-dialog v-model="info" full-width>
      <v-carousel hide-controls interval="99999">
        <v-carousel-item style="opacity:0.5" v-for="(item,i) in items" :key="i" src="https://static-cdn.jtvnw.net/jtv_user_pictures/e91a3dcf-c15a-441a-b369-996922364cdc-profile_image-300x300.png">
          <v-jumbotron dark>
            <v-container fill-height>
              <v-layout align-center>
                <v-flex>
                  <h3 class="headline mb-0 cyan--text">{{item.title}}</h3>
                  <div>{{item.text}}</div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </v-carousel-item>
      </v-carousel>
      </v-dialog>
      <router-view/>
    </v-content>
<!--     <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    > -->
     <!--  <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list> -->
    <!-- </v-navigation-drawer> -->
 <!--    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          title: 'Ready?',
          text: 'Click on the icons below and explore the debates in your area!'
        },
        {
         title: 'Scan the sticker',
          text: 'If you find Holopolis sticker on the street, scan it and enter the conversation.'
        },
        {
          title: 'For more information',
          text: 'Click on information icon at the upper left corner to find out more.'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Holopolis-Map',
      toolbar: true,
      info: false,
    }
  },
  methods: {
    showtoolbar: function() {
      if (this.$route.name == '/' || this.$route.name == 'intro') {
        this.toolbar = false
      } else {
        this.toolbar = true
      }
    },
    showinfo: function() {
      console.log(this.info)
      this.info = !this.info
    }
  },
  created: function() {
    this.showtoolbar()
  },
  watch: {
    $route: function() {
      this.showtoolbar()
    }
  },
  name: 'App'
}
</script>
