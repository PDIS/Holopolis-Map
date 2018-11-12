<template>
  <div>
    <div>Write Comment</div>
    <v-textarea solo value="">
    </v-textarea>
    <div @click="publishComment">
        Send
    </div>
  </div>
</template>

<script>
import { CommentPage } from "../models/CommentPage";

const model = new CommentPage();

export default {
  data: function(props) {
    console.log(props);
    return {
        commentInput: "",
    };
  },
  methods: {
      publishComment: function() {
          model.publishComment(this.commentInput).then(() => {
              console.log("go back to vote again");
              router.push('vote', {params: {}})
          }).catch(err => {
              console.log("server failure, try again later");
              console.error(err);
          });
      },
  }
}
</script>

<style>

</style>
