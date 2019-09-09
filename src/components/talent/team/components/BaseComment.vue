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
          <v-form v-model="valid" ref="form">
            <v-textarea
              v-model="params.content"
              rows="3"
              solo
              label="Leave a comment..."
              :rules="rules"
            >
              <template v-slot:append>
                <v-btn
                  dark
                  small
                  :disabled="!valid"
                  @click="postValidate"
                  color="omikti"
                >{{ $vuetify.lang.t('$vuetify.feedback.post') }}</v-btn>
              </template>
            </v-textarea>
          </v-form>
        </v-timeline-item>
        <v-timeline-item v-for="comment in comments.list" :key="comment.id" color="primary" small>
          <v-card class="elevation-3 pa-3">
            <v-card-title class="subtitle-1" v-if="comment.member">{{comment.member.talent.name}}</v-card-title>
            <v-card-title class="subtitle-1" v-if="comment.mentor">{{comment.mentor.talent.name}}</v-card-title>
            <v-card-text class="caption">
              <v-icon class="mb-1 mr-1" color="primary" small>calendar_today</v-icon>
              {{comment.submitTime}}
            </v-card-text>
            <v-card-text class="title">{{comment.content}}</v-card-text>
            <v-card
              class="ml-4 mr-4 borderchat"
              style="background: #00BAE5;"
              v-if="comment.parent != null"
            >
              <blockquote style="color:#fff" class="blockquote caption">{{comment.parent.content}}</blockquote>
            </v-card>
            <v-card-actions>
              <v-spacer />
              <v-btn
                depressed
                style="margin-right:10px;"
                small
                @click="replyAct(comment.id)"
                v-if="selectedComment == null"
              >
                <v-icon left small>reply</v-icon>Reply
              </v-btn>
              <v-btn
                color="warning"
                style="margin-right:10px;"
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
              <v-form v-model="valid2">
                <v-card-text v-if="selectedComment == comment.id">
                  <v-textarea
                    v-model="reply.content"
                    class="mr-0 mb-1"
                    rows="2"
                    label="Leave a reply..."
                    :rules="rules"
                  ></v-textarea>
                  <div class="mt-3" style="text-align: right;">
                    <v-btn :disabled="!valid2" right dark small @click="replyComment(comment.id)">
                      <v-icon left small>reply</v-icon>Reply
                    </v-btn>
                  </div>
                </v-card-text>
              </v-form>
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
      valid: false,
      valid2: false,
      params: {
        content: ""
      },
      reply: {
        content: ""
      },
      selectedComment: null,
      rules: [
        v => !!v || "Content is required",
        v => v.length >= 3 || "Content must be more than 3 characters"
      ]
    };
  },
  created: function() {
  },
  watch: {
    comments: function() {
      this.params.content = "";
      this.reply.content = "";
      this.selectedComment = null;
      this.$refs.form.resetValidation();
    }
  },
  methods: {
    postValidate: function() {
      if (this.$refs.form.validate()) {
        this.postComment();
      }
    },
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
.borderchat {
  border-left-width: 5px;
  border-left-color: #02819e !important;
  border-left-style: solid;
}
</style>