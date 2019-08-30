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
            <v-btn small @click="openDetail(item.id)">
              <v-icon small left>pageview</v-icon>
              {{$vuetify.lang.t('$vuetify.action.view')}}
            </v-btn>

            <v-btn small @click="openEdit(item.id)" class="ml-2">
              <v-icon small left>edit</v-icon>
              {{$vuetify.lang.t('$vuetify.action.edit')}}
            </v-btn>
            <v-btn small color="warning" @click="deleteAct(item.id)" class="ml-2">
              <v-icon small left>delete</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.delete') }}
            </v-btn>
            <v-expand-transition>
              <div v-show="item.id == selectedIndex">
                <div>
                  <v-icon>warning</v-icon>
                  <span>{{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}</span>
                </div>
                <v-btn small dark @click="deleteData(item.id)" color="red" class="ma-2">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.yes') }}
                </v-btn>
                <v-btn small text @click="deleteAct(null)">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                </v-btn>
              </div>
            </v-expand-transition>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <!-- start competitor form-->
    <v-dialog
      scrollable
      content-class="operplow"
      :fullscreen="fullDialog"
      v-model="competitorForm"
      width="450"
    >
      <v-card>
        <v-card class="taitel primary white--text elevation-5">
          <template v-if="!view">
            <h3
              v-if="edit"
              class="headline mb-0 font-weight-light"
            >{{ $vuetify.lang.t('$vuetify.action.edit') }} {{ $vuetify.lang.t('$vuetify.idea.competitor') }}</h3>
            <h3
              v-if="!edit"
              class="headline mb-0 font-weight-light"
            >{{ $vuetify.lang.t('$vuetify.action.add') }} {{ $vuetify.lang.t('$vuetify.idea.competitor') }}</h3>
          </template>
          <h3
            v-if="view"
            class="headline mb-0 font-weight-light"
          >{{ $vuetify.lang.t('$vuetify.idea.competitor') }}</h3>
        </v-card>
        <v-card-text class="pt-4">
          <v-form ref="form" v-model="valid">
            <v-flex xs12 sm12>
              <v-text-field
                v-model="params.name"
                label="Name"
                hint="Name"
                :rules="nameRules"
                :readonly="view"
              ></v-text-field>
              <v-textarea v-model="params.valueProposed" label="valueProposed" hint="valueProposed" :readonly="view"></v-textarea>
              <v-textarea
                v-model="params.comparativeAdvantage"
                label="comparativeAdvantage"
                hint="comparativeAdvantage"
                :readonly="view"
              ></v-textarea>
              <v-textarea
                v-model="params.differentialAdvantage"
                label="differentialAdvantage"
                hint="differentialAdvantage"
                :readonly="view"
              ></v-textarea>
              <v-textarea v-model="params.focus" label="focus" hint="focus" :readonly="view"></v-textarea>
              <v-textarea v-model="params.asset" label="asset" hint="asset" :readonly="view"></v-textarea>
              <v-textarea
                v-model="params.unfairAdvantage"
                label="unfairAdvantage"
                hint="unfairAdvantage"
                :readonly="view"
              ></v-textarea>
            </v-flex>
            <v-card-actions v-if="view">
              <v-btn text fab @click="competitorForm = false">
                <v-icon color="red">close</v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-actions v-if="!view">
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
      selectedIndex: null,
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
      edit: false,
      view: false,
      fullDialog: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ]
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
      this.view = false;
      this.fullDialog = false;
      this.params = {
        name: "",
        valueProposed: "",
        comparativeAdvantage: "",
        differentialAdvantage: "",
        focus: "",
        asset: "",
        unfairAdvantage: ""
      };
    },
    openEdit: function(id) {
      this.competitorForm = true;
      this.edit = true;
      this.view = false;
      this.getSingleData(id);
      this.fullDialog = false;
    },
    openDetail: function(id) {
      this.competitorForm = true;
      this.edit = false;
      this.view = true;
      this.fullDialog = true;
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
    },
    deleteAct: function(id) {
      if (this.selectedIndex == id) {
        this.selectedIndex = null;
      } else {
        this.selectedIndex = id;
      }
    },
    deleteData: function(id) {
      this.loader2 = true;
      net
        .deleteData(
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
          this.getDataList();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.selectedIndex = null;
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