<template>
  <v-container>
    <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
    <loader-dialog v-model="loader" />
    <v-container fluid>
      <v-data-iterator :items="collaboration.list">
        <template v-slot:default="props">
          <v-row>
            <v-col v-for="(item, index) in props.items" :key="index" cols="12" sm="6" md="4" lg="3">
              <v-card>
                <template v-if="item.idea">
                  <v-card-title>Idea</v-card-title>
                  <v-card-text>{{item.idea.name}}</v-card-text>
                  <v-card-actions>
                    <v-btn small @click="gotoIdea(item)">
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary" disabled>
                      <v-icon small left>group</v-icon>
                      {{item.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.customerSegment">
                  <v-card-title>Customer Segment</v-card-title>
                  <!-- <v-card-title>{{item.customerSegment.name}}</v-card-title> -->
                  <v-card-text>
                    <v-treeview :items="csTree(item)" />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn small @click="gotoCS(item)">
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary" disabled>
                      <v-icon small left>group</v-icon>
                      {{item.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.persona">
                  <v-card-title>Persona</v-card-title>
                  <!-- <v-card-text>{{item.persona.name}}</v-card-text> -->
                  <v-card-text>
                    <v-treeview :items="personaTree(item)" />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn small @click="gotoPersona(item)">
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary" disabled>
                      <v-icon small left>group</v-icon>
                      {{item.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.valueProposition">
                  <v-card-title>Value Proposition</v-card-title>
                  <!-- <v-card-text>{{item.valueProposition.description}}</v-card-text> -->
                  <v-card-text>
                    <v-treeview :items="vpTree(item)" />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn small @click="gotoValueproposition(item)">
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary" disabled>
                      <v-icon small left>group</v-icon>
                      {{item.valueProposition.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.businessCanvas">
                  <v-card-title>Business Canvas</v-card-title>
                  <!-- <v-card-text>{{item.businessCanvas}}</v-card-text> -->
                  <v-card-text>
                    <v-treeview :items="canvasTree(item)" />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn small @click="gotoCanvas(item)">
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary" disabled>
                      <v-icon small left>group</v-icon>
                      {{item.businessCanvas.valueProposition.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.competitor">
                  <v-card-title>Competitor</v-card-title>
                  <!-- <v-card-text>{{item.competitor.name}}</v-card-text> -->
                  <v-card-text>
                    <v-treeview :items="competitorTree(item)" />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn small @click="gotoCompetitor(item)">
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary" disabled>
                      <v-icon small left>group</v-icon>
                      {{item.competitor.valueProposition.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.experiment">
                  <v-card-title>Experiment</v-card-title>
                  <!-- <v-card-text>{{item.experiment.form.name}}</v-card-text> -->
                  <v-card-text>
                    <v-treeview :items="expTree(item)" />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn small @click="gotoExp(item)">
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary" disabled>
                      <v-icon small left>group</v-icon>
                      {{item.experiment.valueProposition.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </v-container>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

import { treeMixins } from "@/mixins/treeMixins.js";

export default {
  mixins: [treeMixins],
  components: {
    "notification-alert": Notification
  },
  data() {
    return {
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { details: [""] },
      loader: false,
      collaboration: { total: 0, list: [] }
    };
  },
  mounted: function() {
    this.getDataList();
  },
  computed: {},
  methods: {
    getDataList: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/as-programme-mentor/" +
            this.$route.params.programId +
            "/collaborators?teamId="
        )
        .then(res => {
          if (res.data.data) {
            this.collaboration = res.data.data;
          } else {
            this.collaboration = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    gotoIdea: function(item) {
      this.$router.push({
        path:
          "/mentor/program/" +
          this.$route.params.programId +
          "/team/" +
          item.idea.team.id +
          "/idea/" +
          item.idea.id
      });
    },
    gotoCS: function(item) {
      this.$router.push({
        path:
          "/mentor/program/" +
          this.$route.params.programId +
          "/team/" +
          item.customerSegment.idea.team.id +
          "/idea/" +
          item.customerSegment.idea.id +
          "/customersegment/" +
          item.customerSegment.id
      });
    },
    gotoPersona: function(item) {
      this.$router.push({
        path:
          "/mentor/program/" +
          this.$route.params.programId +
          "/team/" +
          item.persona.customerSegment.idea.team.id +
          "/idea/" +
          item.persona.customerSegment.idea.id +
          "/customersegment/" +
          item.persona.customerSegment.id +
          "/persona/" +
          item.persona.id
      });
    },
    gotoValueproposition: function(item) {
      this.$router.push({
        path:
          "/mentor/program/" +
          this.$route.params.programId +
          "/team/" +
          item.valueProposition.persona.customerSegment.idea.team.id +
          "/idea/" +
          item.valueProposition.persona.customerSegment.idea.id +
          "/customersegment/" +
          item.valueProposition.persona.customerSegment.id +
          "/persona/" +
          item.valueProposition.persona.id +
          "/vp/" +
          item.valueProposition.id
      });
    },
    gotoCanvas: function(item) {
      this.$router.push({
        path:
          "/mentor/program/" +
          this.$route.params.programId +
          "/team/" +
          item.businessCanvas.valueProposition.persona.customerSegment.idea.team
            .id +
          "/idea/" +
          item.businessCanvas.valueProposition.persona.customerSegment.idea.id +
          "/customersegment/" +
          item.businessCanvas.valueProposition.persona.customerSegment.id +
          "/persona/" +
          item.businessCanvas.valueProposition.persona.id +
          "/vp/" +
          item.businessCanvas.valueProposition.id +
          "/analysis/" +
          item.businessCanvas.form.id
      });
    },
    gotoExp: function(item) {
      this.$router.push({
        path:
          "/mentor/program/" +
          this.$route.params.programId +
          "/team/" +
          item.experiment.valueProposition.persona.customerSegment.idea.team
            .id +
          "/idea/" +
          item.experiment.valueProposition.persona.customerSegment.idea.id +
          "/customersegment/" +
          item.experiment.valueProposition.persona.customerSegment.id +
          "/persona/" +
          item.experiment.valueProposition.persona.id +
          "/vp/" +
          item.experiment.valueProposition.id +
          "/experiment-detail/" +
          item.experiment.id
      });
    },
    gotoCompetitor: function(item) {
      this.$router.push({
        path:
          "/mentor/program/" +
          this.$route.params.programId +
          "/team/" +
          item.competitor.valueProposition.persona.customerSegment.idea.team
            .id +
          "/idea/" +
          item.competitor.valueProposition.persona.customerSegment.idea.id +
          "/customersegment/" +
          item.competitor.valueProposition.persona.customerSegment.id +
          "/persona/" +
          item.competitor.valueProposition.persona.id +
          "/vp/" +
          item.competitor.valueProposition.id +
          "/competitor/" +
          item.competitor.id
      });
    }
  }
};
</script>
<style scoped>
</style>