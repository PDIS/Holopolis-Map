<template>
  <v-container grid-list-xs>
    <v-layout row wrap v-if="isConversationReady" class="ma-3">
      <v-flex xs8>
        <h4 class="display-1">{{conversationData.topic}}</h4>
      </v-flex>
      <v-flex xs4>
        <!-- <v-btn flat @click="visualization=true"><img src="/static/img/icons/opinion_visualization_clickme.jpg" alt="Click me!"></v-btn>-->
        <v-img height="100" width="100" src="/static/img/icons/opinion_visualization_clickme.jpg" alt="Click me!" @click="visualization=true"></v-img>
      </v-flex>
      <v-dialog
        v-model="visualization"
      >
        <v-card style="height: 200px">
          <img src="/static/img/opinion_visualization.gif" alt="Opinion Visualization">
        </v-card>
      </v-dialog>
      <v-flex xs12>
        <div class="body-2 my-3">{{conversationData.description}}</div>
      </v-flex>
      <v-flex xs12 offset-xs8 offset-md8 offset-lg8>
        <v-btn v-if="conversationData.descriptionIsLong" flat class="caption" color="grey" @click="toggleReadMore()">{{conversationData.toggledShort ? "Read More" : "Read Less"}}</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-card flat color="grey lighten-3">
          <v-container v-if="opinionData !== null">
            <v-layout row wrap>
              <v-flex xs12>
                <div class="mb-5 title">{{opinionData.txt}}</div>
              </v-flex>
            </v-layout>
            <v-layout align-center justify-center row fill-height>
              <v-btn round color="teal accent-2" @click="voteYes()">Agree</v-btn>
              <v-btn round color="teal accent-2" @click="voteNo()">Disagree</v-btn>
              <v-btn round color="teal accent-2" @click="skipVote()">Pass</v-btn>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12 class="mt-5">
        <v-layout align-center justify-center row fill-height>
          <v-btn outline color="teal accent-4" class="headline font-weight-light" :to="{name:'opinion', params: {id:this.conversationId}}">Give your opinion</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { VotePage } from "../models/VotePage";
import opinion from '@/components/opinion';
import login from '@/components/login';

const model = new VotePage();

export default {
  components: {
    opinion,
    login
  },
  data: function() {
    return {
      visualization: false,
      isConversationReady: false,
      conversationData: {},
      conversationId: this.$route.params.id,
      opinionData: null,
    };
  },
  methods: {
    toggleReadMore: function() {
      this.conversationData.toggledShort = !this.conversationData.toggledShort;
      this.conversationData.description = this.conversationData.toggledShort ? 
        this.conversationData.shortDescription : 
        this.conversationData.longDescription;
    },
    voteYes: function() {
      model.voteYes().then(this.loadNextOpinion).catch(console.error);
    },
    voteNo: function() {
      model.voteNo().then(this.loadNextOpinion).catch(console.error);
    },
    skipVote: function() {
      model.skipVote().then(this.loadNextOpinion).catch(console.error);
    },
    loadNextOpinion() {
      this.isConversationReady = false;
      model.loadNextOpinion(this.conversationId).then(opinionData => {
        this.opinionData = opinionData;
        this.isConversationReady = true;
      });
    }
  },
  created: function() {
    model.initPage(this.conversationId)
      .then(([conversationData, opinionData, _]) => {
        this.opinionData = opinionData;
        this.conversationData = conversationData;
        this.isConversationReady = true;
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
