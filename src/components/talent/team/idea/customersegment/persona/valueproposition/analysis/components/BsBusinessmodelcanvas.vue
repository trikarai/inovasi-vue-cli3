<template>
  <div>
    <table id="tblbmc" class="table table-bordered table-responsive bisaenter" border="1">
      <tbody>
        <tr>
          <td rowspan="2" style="width: 20%;">
            <strong>
              Key Partners
              <!-- <a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit">
                <i class="fa fa-edit"></i>
              </a> -->
            </strong>
            <p>
              <span v-html="dataBMC.fields[0].value"></span>
            </p>
          </td>
          <td style="width: 20%;">
            <strong>
              Key Activities
              <!-- <a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit">
                <i class="fa fa-edit"></i>
              </a> -->
            </strong>
            <p>
              <span v-html="dataBMC.fields[1].value"></span>
            </p>
          </td>
          <td rowspan="2" style="width: 20%;">
            <strong>
              Value Proposition
              <!-- <a v-if="role === 'Talent'" @click="updateVP()" class="posisiedit">
                <i class="fa fa-pencil-square"></i>
              </a> -->
            </strong>
            <!-- value prop 2 -->
            <p>
              <!-- <span v-html="parentVP.description"></span> -->
            </p>
          </td>
          <td style="width: 20%;">
            <strong>
              Relationship
              <!-- <a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit">
                <i class="fa fa-edit"></i>
              </a> -->
            </strong>
            <p>
              <span v-html="dataBMC.fields[3].value"></span>
            </p>
          </td>
          <td rowspan="2" style="width: 20%;">
            <strong>
              Segmen Pelanggan
              <!-- <a v-if="role === 'Talent'" @click="updateCS()" class="posisiedit">
                <i class="fa fa-pencil-square"></i>
              </a> -->
            </strong>
            <p>
              <!-- <span v-html="parentCS.name"></span> -->
            </p>

            <!-- Segmen Pelanggan 2 -->

            <!-- <div style="text-align: left !important;margin-top: 50px">
              <template v-for="data in personaAspect.aspect.slice(0,4)">
                {{data.field_template.name}} :
                <template v-if="data.value != null">
                  
                    <span v-html="data.value" :key="data.id"></span>
                  
                  
                </template>
                <template v-else>
                  <template v-for="option in data.selected_options">{{option.option.name}}</template>
                </template>
              </template>
            </div> -->
          </td>
        </tr>
        <tr>
          <td>
            <strong>
              Key Resources
              <!-- <a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit">
                <i class="fa fa-edit"></i>
              </a> -->
            </strong>
            <p>
              <span v-html="dataBMC.fields[2].value"></span>
            </p>
          </td>
          <td>
            <strong>
              Channel
              <!-- <a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit">
                <i class="fa fa-edit"></i>
              </a> -->
            </strong>
            <p>
              <span v-html="dataBMC.fields[4].value"></span>
            </p>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <strong>
              Cost Structure
              <!-- <a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit">
                <i class="fa fa-edit"></i>
              </a> -->
            </strong>
            <p>
              <span v-html="dataBMC.fields[5].value"></span>
            </p>
          </td>
          <td style="background: #f1f1f1;"></td>
          <td colspan="2">
            <strong>
              Revenue Stream
              <!-- <a v-if="role === 'Talent'" @click="editBS(dataBMC)" class="posisiedit">
                <i class="fa fa-edit"></i>
              </a> -->
            </strong>
            <p>
              <span v-html="dataBMC.fields[6].value"></span>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      dataBMC: {
        id: "00c3dd3f-d3ea-4f6b-9303-a38ddfd95aba",
        business_structure_template: {
          id: "947500a2-4fe1-4891-acca-a5e1f5e088a3",
          name: "Business Model Canvas",
          description: "Business Model Canvas",
          is_removed: false
        },
        is_removed: false,
        fields: [
          {
            id: "76caff7b-adf8-4e8a-8f6c-5e47095fae5c",
            field_template: {
              id: "aca6ec3d-e906-4bd4-a174-c32d90e178b4",
              name: "Key Partners",
              min_size: null,
              max_size: null,
              position: 1,
              is_removed: false,
              type: "string"
            },
            value: "1. Driver\n2. Pemerintah",
            is_removed: false
          },
          {
            id: "aeab5042-ccf6-4eb8-8dd8-18d683b42329",
            field_template: {
              id: "6effd019-529e-4092-a68b-e8202a05c6a0",
              name: "Key Activities",
              min_size: null,
              max_size: null,
              position: 2,
              is_removed: false,
              type: "string"
            },
            value: "Transaksi : Antar-Jemput Pelanggan",
            is_removed: false
          },
          {
            id: "9abbf82d-5247-4b42-8997-0ea83b963d6c",
            field_template: {
              id: "f0e1b7e2-5b07-479f-8c1f-22812ba5b827",
              name: "Key Resources",
              min_size: null,
              max_size: null,
              position: 3,
              is_removed: false,
              type: "string"
            },
            value: "User Base (Driver & Penumpang)",
            is_removed: false
          },
          {
            id: "e91ed0c5-56f9-402e-8048-7cda32e63686",
            field_template: {
              id: "159ee7ec-87e3-4689-80db-0c10277c7888",
              name: "Relationship",
              min_size: null,
              max_size: null,
              position: 5,
              is_removed: false,
              type: "string"
            },
            value: "Platform - User",
            is_removed: false
          },
          {
            id: "95e40af4-6dd9-4de8-8db9-1cc8295690d1",
            field_template: {
              id: "b7e05151-5657-4caa-811b-60250e23c092",
              name: "Channel",
              min_size: null,
              max_size: null,
              position: 6,
              is_removed: false,
              type: "string"
            },
            value: "Application (Mobile Based)",
            is_removed: false
          },
          {
            id: "3f5d6953-9148-427b-ab59-7aed2654b390",
            field_template: {
              id: "82bf9f30-9257-405b-bd7f-93f52f76b13e",
              name: "Cost Structure",
              min_size: null,
              max_size: null,
              position: 8,
              is_removed: false,
              type: "string"
            },
            value: "- Biaya promosi (harga, iklan)\n- Server & maintenance,",
            is_removed: false
          },
          {
            id: "6668d990-746a-4b96-92bd-308631e084c1",
            field_template: {
              id: "65be9bc4-132b-446f-864c-48ac46e11d14",
              name: "Revenue Stream",
              min_size: null,
              max_size: null,
              position: 9,
              is_removed: false,
              type: "string"
            },
            value: "Fee dari Transaksi yang berhasil",
            is_removed: false
          }
        ]
      }
    };
  }
};
</script>
              