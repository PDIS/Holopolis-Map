<template>
  <v-container grid-list-xs>
    <v-layout row wrap v-if="isQuestionReady">
      <v-flex xs12>
        <h4 class="display-1">{{conversationData.topic}}</h4>
      </v-flex>
      <v-flex xs12>
        <div class="body-2 my-3">{{conversationData.description}}</div>
      </v-flex>
      <v-flex xs12 offset-xs8 offset-md8 offset-lg8>
        <v-btn flat class="caption" color="grey" @click="toggleReadMore()">{{conversationData.descriptionIsShort ? "Read More" : "Read Less"}}</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-card flat color="grey lighten-3">
          <v-container>
            <v-layout row wrap align-center justify-space-center>
              <v-flex xs12 class="mb-5 title">
                <div>{{commentData.txt}}</div>
              </v-flex>
              <v-flex xs4 md4 lg4>
                <v-btn round color="teal accent-2" @click="voteYes()">Agree</v-btn>
              </v-flex>
              <v-flex xs4 md4 lg4>
                <v-btn round color="teal accent-2" @click="voteNo()">Disagree</v-btn>
              </v-flex>
              <v-flex xs4 md4 lg4>
                <v-btn round color="teal accent-2" @click="skipVote()">Pass</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12 class="mt-5">
        <v-btn flat color="teal accent-4" class="headline font-weight-light" :to="{name:'comment', params: {id:this.conversationId}}">Give your opinion</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { VotePage } from "../models/VotePage";
import comment from '@/components/comment';
import login from '@/components/login';

const model = new VotePage();

export default {
  components: {
    comment,
    login
  },
  data: function() {
    return {
      isQuestionReady: false,
      conversationData: {},
      conversationId: this.$route.params.id,
      commentData: {"txt":"NO COMMENT!","tid":4,"created":"1505964534704","tweet_id":null,"quote_src_url":null,"is_seed":false,"is_meta":false,"lang":"zh-TW","pid":20,"randomN":3.452099506918079,"remaining":8,"total":8,"translations":[]},
    };
  },
  methods: {
    toggleReadMore: function() {
      this.conversationData.descriptionIsShort = !this.conversationData.descriptionIsShort;
      this.conversationData.description = this.conversationData.descriptionIsShort ? 
        this.conversationData.shortDescription : 
        this.conversationData.longDescription;
    },
    voteYes: function() {
      model.voteYes().then(this.loadNextComment).catch(console.error);
    },
    voteNo: function() {
      model.voteNo().then(this.loadNextComment).catch(console.error);
    },
    skipVote: function() {
      model.skipVote().then(this.loadNextComment).catch(console.error);
    },
    loadNextComment() {
      this.isQuestionReady = false;
      model.loadNextComment(this.conversationId).then(commentData => {
        this.commentData = commentData;
        this.isQuestionReady = true;
      });
    }
  },
  created: function() {
    model.initPage(this.conversationId)
      .then(([conversationData, commentData, _]) => {
        this.commentData = commentData;
        this.conversationData = conversationData;
        this.isQuestionReady = true;
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
