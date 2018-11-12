<template>
  <div>
    <div>Write Comment</div>
    <v-textarea solo v-model="commentInput">
    </v-textarea>
    <div @click="publishComment">
        Send
    </div>
  </div>
</template>

<script>
import { CommentPage } from "../models/CommentPage";
import login from '@/components/login';

const model = new CommentPage();

export default {
    components: {
        login,
    },
  data: function() {
    return {
        conversationId: this.$route.params.id,
        commentInput: "",
    };
  },
  methods: {
      publishComment: function() {
          model.publishComment(this.conversationId, this.commentInput).then(() => {
              console.log("go back to vote again");
              this.$router.push({name: 'vote', params: {id: this.conversationId}});
          }).catch(err => {
              console.log("server failure, try again later");
              console.error(err);
          });
      },
  },
  created: function() {
      model.loadParticipationId(this.conversationId).catch(err => {
        console.error(err);
        this.$router.push('login');
      });
  }
}
</script>

<style>

</style>
