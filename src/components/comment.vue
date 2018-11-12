<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <h4 class="display-1">How to bring down atmospheric pollution in Madrid?</h4>
      </v-flex>
      <v-flex xs12 class="mt-5">
        <v-textarea solo v-model="commentInput">
        </v-textarea>
      </v-flex>
      <v-flex xs12 class="mt-3">
        <v-btn color="teal accent-2" @click="publishComment">
          <v-icon left class="mb-2">record_voice_over</v-icon>Send
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
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
        this.$router.push('/login');
      });
  }
}
</script>

<style>

</style>
