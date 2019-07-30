<template>
  <div>
    <v-container>
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
      <v-btn @click="openAdd()" color="blue" style="left: -8px">
        <v-icon>add</v-icon>
        {{ $vuetify.t('$vuetify.action.add') }} Entrepreneurship Experiences
      </v-btn>

      <v-data-table :headers="headers" :items="data.list" :loading="loader" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">
            <v-btn @click="openEdit(props.index)" small>
              <v-icon small>edit</v-icon>
              {{ $vuetify.t('$vuetify.action.edit') }}
            </v-btn>
            <v-btn small color="warning" @click="deleteAct(props.item.id)">
              <v-icon small>delete</v-icon>
              {{ $vuetify.t('$vuetify.action.delete') }}
            </v-btn>
            <v-expand-transition>
              <div v-show="props.item.id == selectedIndex">
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

    <EntrepreneurshipForm
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
import EntrepreneurshipForm from "./EntrepreneurshipForm";
import Notification from "@/components/Notification";

export default {
  components: {
    EntrepreneurshipForm,
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
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      dataId: "",
      selectedIndex: null,
      data: { total: 0, list: [] },
      singleData: { id: "", name: "" },
      headers: [
        {
          text: "Business Name",
          align: "left",
          sortable: false,
          value: "name"
        },
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
      notif.reset(this);
      net
        .getData(this, "/talent/entrepreneurship-experiences")
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
      this.singleData = this.data.list[index];
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
      notif.reset(this);
      net
        .deleteData(this, "/talent/entrepreneurship-experiences/" + id)
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
    }
  }
};
</script>
