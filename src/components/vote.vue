<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <h4 class="display-1">How to bring down atmospheric pollution in Madrid?</h4>
      </v-flex>
      <v-flex xs12>
        <div class="body-2 my-3">Madrid City has taken the historic decision in 2016 to prohibit the entry of vehicles in the center of the capital ….</div>
      </v-flex>
      <v-flex xs12 offset-xs8 offset-md8 offset-lg8>
        <v-btn flat class="caption" color="grey">Read More</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-card flat color="grey lighten-3">
          <v-container>
            <v-layout row wrap align-center justify-space-center>
              <v-flex xs12 class="mb-5 title">
                <div>I think we should ban plastic straws and plastic cups in the city</div>
              </v-flex>
              <v-flex xs4 md4 lg4>
                <v-btn round color="teal accent-2" @click="voteYes()">Agree</v-btn>
              </v-flex>
              <v-flex xs4 md4 lg4>
                <v-btn round color="teal accent-2" @click="voteNo()">Disagree</v-btn>
              </v-flex>
              <v-flex xs4 md4 lg4>
                <v-btn round color="teal accent-2" @click="skipVote()">I DON'T CARE</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex xs12 class="mt-5">
        <v-btn flat color="teal accent-4" class="headline font-weight-light">Give your opinion</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { VotePage } from "../models/VotePage";
import comment from '@/components/comment';

const model = new VotePage();

export default {
  components: {
    comment
  },
  data: function() {
    return {
      displayQuestion: false,
      commentData: {"txt":"NO COMMENT!","tid":4,"created":"1505964534704","tweet_id":null,"quote_src_url":null,"is_seed":false,"is_meta":false,"lang":"zh-TW","pid":20,"randomN":3.452099506918079,"remaining":8,"total":8,"translations":[]},
    };
  },
  methods: {
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
      this.displayQuestion = false;
      model.loadNextComment().then(commentData => {
        this.displayQuestion = true;
        this.commentData = commentData;
      });
    }
  },
  created: function() {
    this.loadNextComment();
  }
}
</script>

<style>

</style>
