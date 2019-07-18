<template>
  <div>
    <v-container>
      <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="searchEmail"
            append-icon="search"
            label="Synchronous search by email"
            hide-details
            @input="isTyping = true"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search talent on table"
            hide-details
            clearable="clearable"
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

    <personnel-form v-if="dialogForm" :data="singleData" @close="dialogForm = false" @oke="oke" />
  </div>
</template>
<script>
import Vue from 'vue'
import VueLodash from 'vue-lodash'
const options = { name: 'lodash' } // customize the way you want to call it

import net from "@/config/httpclient";
import alert from "@/config/alerthandling";
import Notification from "@/components/Notification";
import PersonnelForm from "./PersonnelForm";

Vue.use(VueLodash, options) // options is optional

export default {
  components: {
    PersonnelForm,
    "notification-alert": Notification
  },
  data() {
    return {
      res: "",
      isTyping : false,
      clearable: true,
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
      searchEmail: "",
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
  watch: {
    searchEmail: Vue._.debounce(function() {
      this.isTyping = false;
    }, 1000),
    isTyping: function(value) {
      if (!value) {
        this.getTalent();
      }
    }
    
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getTalentTimeOut: function() {
      this.loader = true;
      setTimeout(() => {
        this.getTalent();
      }, 3000);
    },
    getTalent: function() {
      this.loader = true;
      net
        .getData(this, "/administrator/talents?email=" + encodeURI(this.searchEmail))
        .then(res => {
          console.log(res);
          if (res.data.data) {
            this.talents = res.data.data;
          } else {
            this.talents.list = [];
          }
        })
        .catch(error => {
          console.log(error);
          this.talents.list = [];
        })
        .finally(function() {
          this.loader = false;
        });
    },
    getDataList: function() {
      this.loader = true;
      net
        .getData(this, "/administrator/talents")
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
    oke: function(res) {
      alert.showInfo(this, res);
    }
  }
};
</script>
