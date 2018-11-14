<template>
  <v-container grid-list-xs v-if="conversation !== null">
    <v-layout row wrap class="ma-3">
      <v-flex xs12>
        <h4 class="display-1">{{conversation.topic}}</h4>
      </v-flex>
      <v-flex xs12 class="mt-5">
        <v-textarea solo v-model="commentInput" @keyup="showSuggestions()">
        </v-textarea>
      </v-flex>
      <v-expansion-panel>
          <v-expansion-panel-content v-for="suggestion in suggestions" :key="suggestion.id">
            <div slot="header">{{suggestion.dotdotdot}}</div>
            <v-btn flat @click="goToConversation(suggestion.id)">{{suggestion.txt}}</v-btn>
          </v-expansion-panel-content>
      </v-expansion-panel>
      <v-flex xs12 class="mt-3">
        <v-layout align-center justify-space-between row fill-height>
          <v-btn color="teal accent-2" @click="backToVote">
            <v-icon left class="">arrow_back</v-icon>Back
          </v-btn>
          <v-btn color="teal accent-2" @click="publishComment">
            <v-icon left class="">record_voice_over</v-icon>Send
          </v-btn>
        </v-layout>
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
        conversation: null,
        conversationId: this.$route.params.id,
        commentInput: "",
        suggestions: [],
    };
  },
  methods: {
      goToConversation: function(id) {

      },
      backToVote: function() {
        this.$router.push('/vote/' + this.$route.params.id)
      },
      showSuggestions: function() {
          this.suggestions = model.getSuggestionsFor(this.commentInput);
      },
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
      model.initPage(this.conversationId)
      .then(conversation => {
        this.conversation = conversation;
      })
      .catch(err => {
        console.error(err);
        this.$router.push('/login');
      });
  }
}
</script>

<style>

</style>
