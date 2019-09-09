<template>
  <div>
    <v-container style="height:450px;overflow:auto;">
      <!-- {{comments.list}} -->
      <v-divider></v-divider>
      <v-card-title class="subtitle-1">{{ $vuetify.lang.t('$vuetify.feedback.feedback') }}</v-card-title>
      <v-timeline class="pr-5" dense clipped>
        <v-timeline-item fill-dot color="omikti" large>
          <template v-slot:icon>
            <v-icon class="mt-1" style="color:#fff;">add_comment</v-icon>
          </template>
          <v-textarea
            v-model="params.content"
            class="mr-0"
            rows="2"
            hide-details
            flat
            label="Leave a comment..."
            solo
            clearable
          >
            <template v-slot:append>
              <v-btn
                @click="postComment"
                class="mx-0"
                color="omikti"
              >{{ $vuetify.lang.t('$vuetify.feedback.post') }}</v-btn>
            </template>
          </v-textarea>
        </v-timeline-item>
        <v-timeline-item v-for="comment in comments.list" :key="comment.id" color="primary" small>
          <v-card class="elevation-3 pa-3">
            <v-card-title class="subtitle-1">{{comment.member.talent.name}}</v-card-title>
            <v-card-text class="caption">
              <v-icon class="mb-1 mr-1" color="primary" small>calendar_today</v-icon>
              {{comment.submitTime}}
            </v-card-text>
            <v-card-text class="title">{{comment.content}}</v-card-text>
            <v-card color="grey" v-if="comment.parent != null">
              <blockquote class="blockquote caption">{{comment.parent.content}}</blockquote>
            </v-card>
            <v-card-actions>
              <v-spacer />
              <v-btn small @click="replyAct(comment.id)" v-if="selectedComment == null">
                <v-icon small>reply</v-icon>
              </v-btn>
              <v-btn
                color="warning"
                small
                @click="selectedComment = null"
                v-if="selectedComment == comment.id"
              >
                <v-icon small>cancel</v-icon>
              </v-btn>
              <!-- <v-btn color="warning" depressed small>
                <v-icon small>delete</v-icon>
              </v-btn>-->
            </v-card-actions>
            <v-scale-transition>
              <v-card-text v-if="selectedComment == comment.id">
                <v-textarea
                  v-model="reply.content"
                  class="mr-0 mb-1"
                  rows="2"
                  hide-details
                  label="Leave a reply..."
                  clearable
                ></v-textarea>
                <v-btn color="omikti" small @click="replyComment(comment.id)">
                  <v-icon small>reply</v-icon>
                </v-btn>
              </v-card-text>
            </v-scale-transition>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </div>
</template>
<script>
export default {
  props: ["comments"],
  data() {
    return {
      params: {
        content: ""
      },
      reply: {
        content: ""
      },
      selectedComment: null
    };
  },
  created: function() {
    this.params.content = "";
  },
  methods: {
    postComment: function() {
      this.$emit("postComment", this.params);
    },
    replyAct: function(id) {
      if (this.selectedComment == id) {
        this.selectedComment = null;
      } else {
        this.selectedComment = id;
      }
    },
    replyComment: function(id) {
      this.$emit("replyComment", this.reply, id);
    }
  }
};
</script>
<style scoped>
</style>