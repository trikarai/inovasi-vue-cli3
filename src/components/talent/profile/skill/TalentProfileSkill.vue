<template>
  <div>
    <v-container ref="tabletop">
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
      <transition name="fade">
        <v-btn dark @click="openAdd()" color="primary" v-if="!certificateShow">
          <v-icon>add</v-icon>
          {{ $vuetify.lang.t('$vuetify.action.add') }} Skills
        </v-btn>
      </transition>
      <v-data-table
        :headers="headers"
        :items="data.list"
        :loading="loader"
        class="elevation-1 mt-2"
      >
        <template v-slot:item.score="{item}">
          <v-rating :readonly="true" v-model="item.score"></v-rating>
        </template>
        <template v-slot:item.action="{item}">
          <v-container class="text-end" v-visible="!certificateShow">
            <!-- <v-btn @click="openEdit(item.id)" small>
              <v-icon small left>edit</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.edit') }}
            </v-btn>-->
            <v-btn dark class="ma-2" @click="openCertificate(item.id)" small>
              <v-icon small left>card_membership</v-icon>
              {{ $vuetify.lang.t('$vuetify.profile.certificate') }}
            </v-btn>
            <v-btn class="ma-2" small dark color="warning" @click="deleteAct(item.id)">
              <v-icon small left>delete</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.delete') }}
            </v-btn>

            <v-expand-transition>
              <div v-show="item.id == selectedIndex">
                <div>
                  <v-icon>warning</v-icon>
                  <span>{{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}</span>
                </div>
                <v-btn class="ma-2" dark text @click="deleteData(item.id)" color="red">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.yes') }}
                </v-btn>
                <v-btn class="ma-2" text @click="deleteAct(null)">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                </v-btn>
              </div>
            </v-expand-transition>
          </v-container>
        </template>
      </v-data-table>
    </v-container>

    <transition name="fade">
      <v-container v-if="certificateShow">
        <v-divider></v-divider>
        <v-btn style="float:right;font-size: 12px !important;" small @click="closeCertificate" color="warning">
          close
        </v-btn>
        <v-layout>
          <CertificateComp :skillId="skillId" />
        </v-layout>
      </v-container>
    </transition>
    <div ref="scrollBottom"></div>

    <SkillForm
      :data="singleData"
      v-bind:edit="edit"
      v-bind:view="view"
      v-if="dialogForm"
      @close="dialogForm = false"
      @refresh="refresh()"
    />
  </div>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";

import SkillForm from "./SkillForm";
import Notification from "@/components/Notification";
import CertificateComp from "./certificate/TalentProfileSkillCertificate";

export default {
  components: {
    SkillForm,
    CertificateComp,
    "notification-alert": Notification
  },
  data() {
    return {
      certificateShow: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { details: [""] },
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      dataId: "",
      selectedIndex: null,
      data: { total: 0, list: [] },
      singleData: { id: "", name: "" },
      skillId: "",
      headers: [
        {
          text: "Skill",
          align: "left",
          sortable: false,
          value: "skillReferenceName"
        },
        { text: "Score", value: "score", sortable: false },
        { text: "", value: "action", sortable: false }
      ]
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
        .getData(this, "/talent/skills")
        .then(res => {
          if (res.data.data) {
            this.data = res.data.data;
          } else {
            this.data.list = [];
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    openEdit: function(index) {
      this.dialogForm = true;
      this.view = false;
      this.edit = true;
      this.singleData.id = index;
    },
    openAdd: function() {
      this.dialogForm = true;
      this.view = false;
      this.edit = false;
      this.singleData = { id: "", name: "" };
    },
    deleteAct: function(id) {
      if (this.selectedIndex == id) {
        this.selectedIndex = null;
      } else {
        this.selectedIndex = id;
      }
    },
    deleteData: function(id) {
      this.loader = true;
      notif.reset(this);
      net
        .deleteData(this, "/talent/skills/" + id)
        .then()
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.selectedIndex = null;
          this.refresh();
        });
    },
    refresh: function() {
      this.dialogForm = false;
      this.getDataList();
    },
    openCertificate: function(id) {
      this.skillId = id;
      this.certificateShow = true;
      this.$vuetify.goTo(this.$refs.scrollBottom, {
        duration: 500,
        offset: 0,
        easing: "linear"
      });
    },
    closeCertificate: function() {
      this.$vuetify.goTo(this.$refs.tabletop, {
        duration: 500,
        offset: 0,
        easing: "linear"
      });
      this.certificateShow = false;
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
