<template>
  <div>
    <div>Question</div>
    <v-dialog v-model="displayQuestion">
      <div>{{commentData.txt}}</div>
      <div @click="voteYes()">Vote YES</div>
      <div @click="voteNo()">Vote NO</div>
      <div @click="skipVote()">SKIP</div>
      <v-btn :to="{name:'comment', params: {id:0}}">Write your own opinion</v-btn>
    </v-dialog>
  </div>
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
