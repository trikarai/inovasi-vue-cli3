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
                  <v-card-text>Idea</v-card-text>
                  <v-card-title>{{item.idea.name}}</v-card-title>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary">
                      <v-icon small left>group</v-icon> {{item.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.customerSegment">
                  <v-card-text>Persona</v-card-text>
                  <v-card-title>{{item.customerSegment.name}}</v-card-title>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary">
                      <v-icon small left>group</v-icon> {{item.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.persona">
                  <v-card-text>Persona</v-card-text>
                  <v-card-title>{{item.persona.name}}</v-card-title>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary">
                      <v-icon small left>group</v-icon> {{item.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.valueProposition">
                  <v-card-text>Value Proposition</v-card-text>
                  <v-card-title>{{item.valueProposition.description}}</v-card-title>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary">
                      <v-icon small left>group</v-icon> {{item.valueProposition.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.businessCanvas">
                  <v-card-text>Business Canvas</v-card-text>
                  <v-card-title>{{item.businessCanvas.form.name}}</v-card-title>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary">
                      <v-icon small left>group</v-icon> {{item.businessCanvas.valueProposition.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.competitor">
                  <v-card-text>Competitor</v-card-text>
                  <v-card-title>{{item.competitor.name}}</v-card-title>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small color="primary">
                      <v-icon small left>group</v-icon> {{item.competitor.valueProposition.persona.customerSegment.idea.team.name}}
                    </v-btn>
                  </v-card-actions>
                </template>

                <template v-if="item.experiment">
                  <v-card-text>Experiment</v-card-text>
                  <v-card-title>{{item.experiment.form.name}}</v-card-title>
                  <v-card-actions>
                    <v-btn small>
                      <v-icon>pageview</v-icon>
                    </v-btn>
                    <v-btn small>
                      <v-icon small left>group</v-icon> {{item.experiment.valueProposition.persona.customerSegment.idea.team.name}}
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
    }
  }
};
</script>
<style scoped>
</style>