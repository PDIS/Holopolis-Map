<template>
  <qrcode-stream :camera="{ facingMode: { ideal: 'environment' }, width: { min: 360, ideal: 680, max: 1920 }, height: { min: 240, ideal: 480, max: 1080 }, }" @decode="onDecode"></qrcode-stream>
</template>

<script>
export default {
  methods: {
    onDecode (decodedString) {
      console.log('fuck')
    }
  }
}
</script>

<style>

</style>
