<template>
  <div>
    <v-container ref="tabletop">
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
      <!-- {{res}}<br> -->
      <transition name="fade">
        <v-btn @click="openAdd()" color="blue" style="left: -8px" v-if="!optionShow">
          <v-icon>add</v-icon>
          {{ $vuetify.t('$vuetify.action.add') }} Field
        </v-btn>
      </transition>
      <v-dialog v-model="loader" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{ $vuetify.t('$vuetify.info.standby') }}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-data-table dark :headers="headers" :items="field.list" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.position }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.type.displayName }}</td>
          <td>
            <v-btn
              @click="openOption(props.item.id)"
              color="blue"
              right
              small
              fab
              v-show="props.item.type.value === 'sel'"
            >
              <v-icon>playlist_add</v-icon>
            </v-btn>
          </td>
          <td class="text-xs-right" v-visible="!optionShow">
            <v-btn @click="openEdit(props.item.id)" small>
              <v-icon small>edit</v-icon>
              {{ $vuetify.t('$vuetify.action.edit') }}
            </v-btn>
            <v-btn small dark color="warning" @click="deleteAct(props.index)" v-show="!optionShow">
              <v-icon small>delete</v-icon>
              {{ $vuetify.t('$vuetify.action.delete') }}
            </v-btn>

            <v-expand-transition>
              <div v-show="props.index == selectedIndex">
                {{ $vuetify.t('$vuetify.action.confirmationtodelete') }}
                <v-btn @click="deleteData(props.item.id)" color="red">
                  <v-icon></v-icon>
                  {{ $vuetify.t('$vuetify.action.yes') }}
                </v-btn>
                <v-btn @click="deleteAct(null)">
                  <v-icon></v-icon>
                  {{ $vuetify.t('$vuetify.action.cancel') }}
                </v-btn>
              </div>
            </v-expand-transition>
          </td>
        </template>
      </v-data-table>
    </v-container>
    <transition name="fade">
      <v-container v-if="optionShow">
        <v-divider></v-divider>
        <v-btn small @click="closeOption" color="warning">
          <v-icon>close</v-icon>Close
        </v-btn>
        <v-layout>
          <OptionList :fieldId="fieldId" />
        </v-layout>
      </v-container>
    </transition>
    <div ref="scrollBottom"></div>

    <FieldForm
      :data="singleData"
      :edit="edit"
      :view="view"
      v-if="dialogForm"
      @close="dialogForm = false"
      @refresh="refresh()"
    />
  </div>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";
import FieldForm from "./AddField";
import OptionList from "./option/AdministratorManageFormFieldOption";
import { setTimeout } from "timers";

export default {
  components: {
    "notification-alert": Notification,
    FieldForm,
    OptionList
  },
  data() {
    return {
      res: "",
      optionShow: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: "",
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      dataId: "",
      selectedIndex: null,
      field: { total: 0, list: [] },
      fieldId: "",
      singleData: { id: "", name: "" },
      headers: [
        {
          text: "position",
          align: "left",
          sortable: true,
          value: "position"
        },
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Type", value: "type.displayName", sortable: false },
        { text: "Option", value: "type.value", sortable: false },
        { text: "", value: "id", sortable: false }
      ]
    };
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList: function() {
      this.loader = true;
      net
        .getData(
          this,
          "/administrator/forms/" + this.$route.params.formId + "/fields"
        )
        .then(
          res => {
            if (res.data.data) {
              this.field = res.data.data;
            } else {
              this.field.list = [];
            }
          },
          error => {
            console.log(error);
            this.err_msg = error.body.meta;
            this.status.error = true;
          }
        )
        .catch(function() {})
        .finally(function() {
          this.loader = false;
        });
    },
    openEdit: function(id) {
      this.dialogForm = true;
      this.view = false;
      this.edit = true;
      this.singleData.id = id;
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
      net
        .deleteData(
          this,
          "/administrator/fields/" + this.$route.params.formId + "/fields/" + id
        )
        .then()
        .catch(function() {})
        .finally(function() {
          this.selectedIndex = null;
          this.refresh();
        });
    },
    refresh: function() {
      this.dialogForm = false;
      this.getDataList();
    },
    openOption: function(id) {
      this.fieldId = id;
      this.optionShow = true;
      this.$vuetify.goTo(this.$refs.scrollBottom, {
        duration: 500,
        offset: 0,
        easing: "linear"
      });
    },
    closeOption: function() {
      this.$vuetify.goTo(this.$refs.tabletop, {
        duration: 500,
        offset: 0,
        easing: "linear"
      });
      this.optionShow = false;
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
