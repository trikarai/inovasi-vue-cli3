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
                  <v-card-text>{{item.persona.name}}</v-card-text>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary">
                      <v-icon small left>group</v-icon>
                      {{item.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.valueProposition">
                  <v-card-title>Value Proposition</v-card-title>
                  <v-card-text>{{item.valueProposition.description}}</v-card-text>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary">
                      <v-icon small left>group</v-icon>
                      {{item.valueProposition.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.businessCanvas">
                  <v-card-title>Business Canvas</v-card-title>
                  <v-card-text>{{item.businessCanvas.form.name}}</v-card-text>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary">
                      <v-icon small left>group</v-icon>
                      {{item.businessCanvas.valueProposition.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.competitor">
                  <v-card-title>Competitor</v-card-title>
                  <v-card-text>{{item.competitor.name}}</v-card-text>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary">
                      <v-icon small left>group</v-icon>
                      {{item.competitor.valueProposition.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.experiment">
                  <v-card-title>Experiment</v-card-title>
                  <v-card-text>{{item.experiment.form.name}}</v-card-text>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary">
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
export default {
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
    csTree: function(item) {
      var data = [
        {
          id: item.customerSegment.id,
          name: item.customerSegment.name,
          children: [
            {
              id: item.customerSegment.idea.id,
              name: item.customerSegment.idea.name
            }
          ]
        }
      ];
      return data;
    },
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
    }
  }
};
</script>
<style scoped>
</style>