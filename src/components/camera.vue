<template>
  <div>
    <qrcode-stream @decode="onDecode">
     <!--  <v-img :aspect-ratio="16/9" dark src="https://static-cdn.jtvnw.net/jtv_user_pictures/e91a3dcf-c15a-441a-b369-996922364cdc-profile_image-300x300.png" style="opacity: 0.45">
      </v-img> -->
      <v-card color="black" dark style="opacity: 0.45">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0 cyan--text">Scan to join the conversation</h3>
            <div>How to bring down atmospheric pollution in Madrid?</div>
          </div>
        </v-card-title>
      </v-card>
    </qrcode-stream>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popup: false,
    }
  },
  methods: {
    onDecode (decodedString) {
      this.$router.push('/vote/3n3dxmbjwt')
    }
  }
}
</script>

<style>

</style>
