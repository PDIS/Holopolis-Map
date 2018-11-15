<template>
  <v-container grid-list-xs v-if="conversation !== null">
    <v-layout row wrap class="ma-3">
      <v-flex xs12>
        <h4 class="display-1">{{conversation.topic}}</h4>
      </v-flex>
      <v-flex xs12 class="mt-5">
        <v-textarea solo v-model="opinionInput" @keyup="showSuggestions()">
        </v-textarea>
        <v-btn color="teal accent-2" @click="publishOpinion">
          <v-icon left class="">record_voice_over</v-icon>Send
        </v-btn>
      </v-flex>
      <v-flex v-if="suggestions.length > 0">
        Is that what you mean?
        <v-flex xs12 v-for="suggestion in suggestions" :key="suggestion.id">
          <v-textarea readonly no-resize solo :value="suggestion.txt">{{suggestion.txt}}</v-textarea>
          <v-btn v-if="suggestion.notAgreed" color="teal accent-2" @click="agreeSuggestion(suggestion)">
            <v-icon left class="">record_voice_over</v-icon>Agree
          </v-btn>
        </v-flex>
      </v-flex>
      <!--
      <v-expansion-panel>
          <v-expansion-panel-content v-for="suggestion in suggestions" :key="suggestion.id">
            <div slot="header">{{suggestion.dotdotdot}}</div>
            <v-btn flat @click="goToConversation(suggestion.id)">{{suggestion.txt}}</v-btn>
          </v-expansion-panel-content>
      </v-expansion-panel>
      -->
      <v-flex xs12 class="mt-3">
        <v-layout align-center justify-space-between row fill-height>
          <v-btn color="teal accent-2" @click="backToVote">
            <v-icon left class="">arrow_back</v-icon>Back
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
     <v-dialog
      v-model="thankscard"
      max-width="290"
    >
      <v-card class="rounded-card">
        <v-card-text>
          <div class="title text-xs-center">Congratulations!</div>
          <div class=".body-2 mt-2">You have submitted your comment.</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-layout align-center justify-center row fill-height>
            <v-btn large color="cyan" flat="flat" :to="{name: 'vote', params: {id: this.conversationId}}">
              Confirm
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { OpinionPage } from "../models/OpinionPage";
import login from '@/components/login';

const model = new OpinionPage();

export default {
    components: {
        login,
    },
  data: function() {
    return {
        conversation: null,
        conversationId: this.$route.params.id,
        opinionInput: "",
        suggestions: [],
        thankscard: false
    };
  },
  methods: {
      agreeSuggestion: function(suggestion) {
        model.agreeSuggestion(suggestion).then(suggestions => {
          this.suggestions = suggestions;
        });
      },
      backToVote: function() {
        this.$router.push('/vote/' + this.$route.params.id)
      },
      showSuggestions: function() {
          this.suggestions = model.getSuggestionsFor(this.opinionInput);
      },
      publishOpinion: function() {
          model.publishOpinion(this.conversationId, this.opinionInput).then(() => {
              console.log("go back to vote again");
              this.thankscard = true
              //this.$router.push({name: 'vote', params: {id: this.conversationId}});
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
.rounded-card{
    border-radius:20px;
}
</style>
