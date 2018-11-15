<template>
  <div>
    <qrcode-stream
      @decode="onDecode"
      @init="onInit"
      style="background: black"
      id="qrcode-stream-container"
    >
      <v-card color="black" dark style="opacity: 0.45">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0 cyan--text">Scan to join the conversation</h3>
            <div>Find our stickers and place the QR code on the center of the screen.</div>
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
    onDecode(decodedString) {
      this.$router.push('/vote/3n3dxmbjwt')
    },
    onInit() {
      const video = document.getElementById('qrcode-stream-container').querySelector('video');
      video.style.height = (+window.innerHeight - 56) + "px";
    }
  }
}
</script>

<style>

</style>
