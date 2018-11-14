<template>
  <qrcode-stream @decode="onDecode"></qrcode-stream>
</template>

<script>
export default {
  methods: {
    onDecode (decodedString) {
      console.log('ya')
    }
  }
}
</script>

<style>

</style>
