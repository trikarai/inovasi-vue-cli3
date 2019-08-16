<template>
  <div>
    <v-container>
      <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      <!-- {{res}}<br> -->
      <v-btn @click="openAdd()" color="primary" class="mb-3">
        <v-icon>add</v-icon>
        {{ $vuetify.lang.t('$vuetify.action.add') }} {{ $vuetify.lang.t('$vuetify.personnel.mentor') }}
      </v-btn>

      <v-data-table
        dark
        :headers="headers"
        :loading="loader"
        :items="coordinator.list"
        class="elevation-1"
      >
        <template v-slot:item.action="{item}">
            <!-- <v-btn @click="openDetail(item)" small>
              <v-icon small>search</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.view') }} 
             </v-btn> -->
            <v-btn small dark color="warning" @click="deleteAct(item.id)">
              <v-icon small>delete</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.delete') }}
            </v-btn>
            <v-expand-transition>
              <div v-show="item.id == selectedIndex">
                {{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}
                <v-btn @click="deleteData(item.id)" color="red">
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
  </div>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";
import notif from "@/config/alerthandling";

export default {
  components: {
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
      err_msg: {details:[""]},
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      dataId: "",
      selectedIndex: null,
      coordinator: { total: 0, list: [] },
      singleData: { id: "", name: "" },
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "talent.name"
        },
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
        .getData(
          this,
          "/administrator/programmes/" +
            this.$route.params.programId +
            "/mentors"
        )
        .then(res=> {
          if (res.data.data) {
            this.coordinator = res.data.data;
          } else {
            this.coordinator.list = [];
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(()=> {
          this.loader = false;
        });
    },
    openEdit: function(index) {
      this.dialogForm = true;
      this.view = false;
      this.edit = true;
      this.singleData = index;
    },
    openAdd: function() {
      this.$router.push({
        path:
          "/administrator/program/" +
          this.$route.params.programId +
          "/mentor/search"
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
      net
        .deleteData(
          this,
          "/administrator/programmes/" +
            this.$route.params.programId +
            "/mentors/" +
            id
        )
        .then()
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(()=> {
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
