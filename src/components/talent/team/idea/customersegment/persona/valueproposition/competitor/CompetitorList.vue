<template>
  <v-container>
    <notification ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />

    <loader-dialog v-model="loader2"></loader-dialog>

    <v-btn dark @click="openAdd()" color="primary" class="mb-2">
      <v-icon>add</v-icon>
      {{ $vuetify.lang.t('$vuetify.action.add') }} {{$vuetify.lang.t('$vuetify.idea.competitor')}}
    </v-btn>
    <v-layout>
      <v-flex md12>
        <v-data-table :headers="headers" :loading="loader" :items="competitor.list">
          <template v-slot:item.action="{item}">
            <v-btn @click="openEdit(item.id)">
              <v-icon>edit</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <!-- start competitor form-->
    <v-dialog
      scrollable
      content-class="operplow"
      :fullscreen="false"
      v-model="competitorForm"
      width="450"
    >
      <v-card>
        <v-card class="taitel primary white--text elevation-5">
          <h3
            v-if="edit"
            class="headline mb-0 font-weight-light"
          >{{ $vuetify.lang.t('$vuetify.action.edit') }} {{ $vuetify.lang.t('$vuetify.idea.competitor') }}</h3>
          <h3
            v-if="!edit"
            class="headline mb-0 font-weight-light"
          >{{ $vuetify.lang.t('$vuetify.action.add') }} {{ $vuetify.lang.t('$vuetify.idea.competitor') }}</h3>
        </v-card>
        <v-card-text class="pt-4">
          <v-form ref="form" v-model="valid">
            <v-flex xs12 sm12>
              <v-text-field v-model="params.name" label="Name" hint="Name"></v-text-field>
              <v-textarea v-model="params.valueProposed" label="valueProposed" hint="valueProposed"></v-textarea>
              <v-textarea
                v-model="params.comparativeAdvantage"
                label="comparativeAdvantage"
                hint="comparativeAdvantage"
              ></v-textarea>
              <v-textarea
                v-model="params.differentialAdvantage"
                label="differentialAdvantage"
                hint="differentialAdvantage"
              ></v-textarea>
              <v-textarea v-model="params.focus" label="focus" hint="focus"></v-textarea>
              <v-textarea v-model="params.asset" label="asset" hint="asset"></v-textarea>
              <v-textarea
                v-model="params.unfairAdvantage"
                label="unfairAdvantage"
                hint="unfairAdvantage"
              ></v-textarea>
            </v-flex>
            <v-card-actions>
              <v-btn
                v-if="!edit"
                @click="submit"
                :class=" { 'primary white--text' : valid}"
                :disabled="!valid"
              >
                <v-icon>add</v-icon>
                {{ $vuetify.lang.t('$vuetify.action.add') }}
              </v-btn>
              <v-btn
                v-if="edit"
                @click="update"
                :class=" { 'primary white--text' : valid}"
                :disabled="!valid"
              >
                <v-icon>edit</v-icon>
                {{ $vuetify.lang.t('$vuetify.action.edit') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- end competitor form -->
  </v-container>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

export default {
  data() {
    return {
      valid: false,
      loader: false,
      loader2: false,
      err_msg: { details: [""] },
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      competitor: { total: 0, list: [] },
      competitorId: "",
      competitorDetail: "",
      params: {
        name: "",
        valueProposed: "",
        comparativeAdvantage: "",
        differentialAdvantage: "",
        focus: "",
        asset: "",
        unfairAdvantage: ""
      },
      headers: [
        {
          text: "Competitor Name",
          value: "name",
          sortable: false
        },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      competitorForm: false,
      edit: false
    };
  },
  components: {
    Notification
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
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/" +
            this.$route.params.customersegmentId +
            "/personas/" +
            this.$route.params.personaId +
            "/value-propositions/" +
            this.$route.params.valuepropositionId +
            "/competitors"
        )
        .then(res => {
          if (res.data.data) {
            this.competitor = res.data.data;
          } else {
            this.competitor = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    openAdd: function() {
      this.competitorForm = true;
      this.edit = false;
    },
    openEdit: function(id) {
      this.competitorForm = true;
      this.edit = true;
      this.getSingleData(id);
    },
    submit: function() {
      if (this.$refs.form.validate()) {
        this.addData();
      } else {
        this.$vuetify.goTo(this.$refs.notif, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    update: function() {
      if (this.$refs.form.validate()) {
        this.addData();
      } else {
        this.$vuetify.goTo(this.$refs.notif, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    addData: function() {
      this.loader2 = true;
      notif.reset(this);
      if (this.edit) {
        net
          .putData(
            this,
            "/talent/as-team-member/" +
              this.$route.params.teamId +
              "/ideas/" +
              this.$route.params.ideaId +
              "/customer-segments/" +
              this.$route.params.customersegmentId +
              "/personas/" +
              this.$route.params.personaId +
              "/value-propositions/" +
              this.$route.params.valuepropositionId +
              "/competitors/" +
              this.competitorId,
            this.params
          )
          .then(res => {
            notif.showInfo(this, res, ["OK"]);
            this.competitorForm = false;
            this.getDataList();
          })
          .catch(error => {
            notif.showError(this, error);
          })
          .finally(() => {
            this.loader2 = false;
          });
      } else {
        net
          .postData(
            this,
            "/talent/as-team-member/" +
              this.$route.params.teamId +
              "/ideas/" +
              this.$route.params.ideaId +
              "/customer-segments/" +
              this.$route.params.customersegmentId +
              "/personas/" +
              this.$route.params.personaId +
              "/value-propositions/" +
              this.$route.params.valuepropositionId +
              "/competitors",
            this.params
          )
          .then(res => {
            notif.showInfo(this, res, ["OK"]);
            this.competitorForm = false;
            this.getDataList();
          })
          .catch(error => {
            notif.showError(this, error);
          })
          .finally(() => {
            this.loader2 = false;
          });
      }
    },
    getSingleData: function(id) {
      this.loader2 = true;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/" +
            this.$route.params.customersegmentId +
            "/personas/" +
            this.$route.params.personaId +
            "/value-propositions/" +
            this.$route.params.valuepropositionId +
            "/competitors/" +
            id
        )
        .then(res => {
          this.competitorId = res.data.data.id;
          this.params = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader2 = false;
        });
    }
  }
};
</script>
<style scoped>
.taitel {
  padding: 24px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
</style>