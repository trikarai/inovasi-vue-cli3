<template>
  <div>
    <v-container ref="tabletop">
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
      <!-- {{res}}<br> -->
      <transition name="fade">
        <v-btn @click="openAdd()" color="primary" class="mb-3" v-if="!optionShow">
          <v-icon>add</v-icon>
          {{ $vuetify.lang.t('$vuetify.action.add') }} Field
        </v-btn>
      </transition>

      <v-data-table :loading="loader" :headers="headers" :items="field.list" class="elevation-1">
        <template v-slot:item.option="{item}">
          <v-btn
            @click="openOption(item.id)"
            color="blue"
            right
            small
            fab
            v-show="item.type.value === 'sel'"
          >
            <v-icon>playlist_add</v-icon>
          </v-btn>
        </template>

        <template v-slot:item.action="{item}">
          <v-btn @click="openEdit(item.id)" small class="mr-1">
            <v-icon small>edit</v-icon>
            {{ $vuetify.lang.t('$vuetify.action.edit') }}
          </v-btn>
          <v-btn small dark color="warning" @click="deleteAct(item.id)" v-show="!optionShow">
            <v-icon small>delete</v-icon>
            {{ $vuetify.lang.t('$vuetify.action.delete') }}
          </v-btn>

          <v-expand-transition>
            <div v-show="item.id == selectedIndex">
              {{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}
              <v-btn @click="deleteData(item.id)" color="red" class="ma-2">
                <v-icon></v-icon>
                {{ $vuetify.lang.t('$vuetify.action.yes') }}
              </v-btn>
              <v-btn @click="deleteAct(null)">
                <v-icon></v-icon>
                {{ $vuetify.lang.t('$vuetify.action.cancel') }}
              </v-btn>
            </div>
          </v-expand-transition>
        </template>
      </v-data-table>
    </v-container>
    <template v-if="!optionShow">
      <v-container
        style="display: grid; justify-items: stretch; grid-gap: 5px 5px"
        v-if="$store.state.formType == 'can'"
      >
        <template v-for="field in field.list">
          <div :key="field.id" :style="'grid-area:' + getGridPosition(field.position) + ''">
            <v-card class="elevation-3" height="100%">
              <v-card-text>{{field.name}}</v-card-text>
            </v-card>
          </div>
        </template>
      </v-container>
    </template>

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
      :total="field.total"
      v-if="dialogForm"
      @close="dialogForm = false"
      @refresh="refresh()"
    />
  </div>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";
import FieldForm from "./AddField";
import OptionList from "./option/AdministratorManageFormFieldOption";

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
      err_msg: { details: [""] },
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
        { text: "Option", value: "option", sortable: false },
        { text: "", value: "action", sortable: false, align: "right" }
      ]
    };
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getGridPosition: function(position) {
      var position = JSON.parse(position);
      return position.grid;
    },
    getDataList: function() {
      this.loader = true;
      net
        .getData(
          this,
          "/administrator/forms/" + this.$route.params.formId + "/fields"
        )
        .then(res => {
          if (res.data.data) {
            this.field = res.data.data;
          } else {
            this.field.list = [];
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
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
          "/administrator/forms/" + this.$route.params.formId + "/fields/" + id
        )
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
