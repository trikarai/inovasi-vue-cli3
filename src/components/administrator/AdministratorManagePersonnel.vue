<template>
  <div>
    <v-container>
      <v-btn @click="openAdd()" color="blue" style="left: -8px">
        <v-icon>add</v-icon>{{ $vuetify.t('$vuetify.action.add') }} Personnel
      </v-btn>

      <v-data-table dark :headers="headers" :items="data.list" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">
            <v-btn @click="openDetail(props.item.id)" small>
              <v-icon small>search</v-icon>{{ $vuetify.t('$vuetify.action.view') }}
            </v-btn>
            <v-btn small dark color="warning" @click="deleteAct(props.index)"><v-icon small>delete</v-icon> {{ $vuetify.t('$vuetify.action.delete') }}</v-btn>
            <v-expand-transition>
              <div v-show="props.index == selectedIndex">
                Delete Confirm !
                <v-btn @click="deleteData(props.item.id)" color="red">
                  <v-icon></v-icon>{{ $vuetify.t('$vuetify.action.yes') }}
                </v-btn>
                <v-btn @click="deleteAct(null)">
                  <v-icon></v-icon>{{ $vuetify.t('$vuetify.action.cancel') }}
                </v-btn>
              </div>
            </v-expand-transition>
          </td>
        </template>
      </v-data-table>
    </v-container>

    <AdminForm
      :id="adminid"
      v-bind:edit="edit"
      v-bind:view="view"
      v-if="dialogForm"
      @close="dialogForm = false"
    />
    <!-- <delete-confirmation v-if="dialogDel" @close="dialogDel = false" /> -->
  </div>
</template>
<script>
import AdminForm from "./admin/AddAdmin";
export default {
  components: {
    AdminForm
    },
  data() {
    return {
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      adminid: "",
      selectedIndex: null,
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: true,
          value: "name"
        },
        { text: "", value: "id" }
      ],
      data: {
        total: 0,
        list: [
          {
            id: "1",
            name: "name update"
          },
          {
            id: "administrator-one-id",
            name: "administrator one"
          },
          {
            id: "administrator-two-id",
            name: "administrator trikarai\n"
          }
        ]
      }
    };
  },
  methods: {
    openDetail: function(id) {
      this.dialogForm = true;
      this.view = true;
      this.adminid = id;
    },
    openAdd: function() {
      this.dialogForm = true;
      this.edit = false;
      this.adminid = "";
    },
    deleteAct: function(id) {
      // this.dialogDel = true
      if (this.selectedIndex == id) {
        this.selectedIndex = null
      } else {
        this.selectedIndex = id;
      }
    },
    deleteData: function(id) {
      alert(id);
    }
  }
};
</script>
