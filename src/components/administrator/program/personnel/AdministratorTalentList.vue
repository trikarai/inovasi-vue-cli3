<template>
  <div>
    <v-container>
      <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      <v-card v-visible="!loader">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </v-card>
      <v-data-table
        dark
        :loading="loader"
        :headers="headers"
        :items="talents.list"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.username }}</td>
          <td>{{ props.item.email }}</td>
          <td class="text-xs-right">
            <v-btn @click="openDetail(props.index)" small>
              <v-icon small>add</v-icon>
              <!-- {{ $vuetify.t('$vuetify.action.add') }} -->
              Assign
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-container>

    <personnel-form v-if="dialogForm" :data="singleData" @close="dialogForm = false"  @oke="oke" />
  </div>
</template>
<script>
import net from "@/config/httpclient";
import alert from "@/config/alerthandling";
import Notification from "@/components/Notification";
import PersonnelForm from "./PersonnelForm";
export default {
  components: {
    PersonnelForm,
    "notification-alert": Notification
  },
  data() {
    return {
      res: "",
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
      talents: { total: 0, list: [] },
      singleData: { id: "", name: "" },
      search: "",
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "talent.name"
        },
        { text: "username", value: "username", sortable: false },
        { text: "email", value: "email", sortable: false },
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
        .getData(this, "/administrator/talents/")
        .then(res => {
          if (res.data.data) {
            this.talents = res.data.data;
          } else {
            this.talents.list = [];
          }
        })
        .catch(error => {
          console.log(error);
          alert.showError(this, error);
        })
        .finally(function() {
          this.loader = false;
        });
    },
    openDetail: function(index) {
      this.dialogForm = true;
      this.view = false;
      this.edit = true;
      this.singleData = this.talents.list[index];
    },
    refresh: function() {
      this.dialogForm = false;
      this.getDataList();
    },
    oke: function(res){
      alert.showInfo(this, res)
    }
  }
};
</script>
