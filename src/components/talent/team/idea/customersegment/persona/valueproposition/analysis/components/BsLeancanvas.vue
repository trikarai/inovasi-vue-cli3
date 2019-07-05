<template>
  <table class="table table-bordered" id="tblleancanvas">
    <tbody>
      <tr>
        <td rowspan="2" style="width: 20%;">
          <strong class="lcproblem">
            Problem
            <!-- <a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit">
              <i class="fa fa-edit"></i>
            </a>-->
          </strong>
          <p>
            <span v-html="dataLean.fields[0].value"></span>
          </p>
        </td>
        <td style="width: 20%;">
          <strong class="lcsolution">Solution</strong>
          <!--<p>{{dataLean.fields[1].value}}</p>-->
          <!--<p>{{personaAspect.aspect[9].value}}</p>-->
          <!-- <p v-if="dataSolution">
            <span v-html="dataSolution.fields[0].value"></span>
          </p>-->
          <!--<a @click="editBS(dataLean)" class="btn btn-default btn-sm"><i class="fa fa-edit"></i></a>-->
        </td>
        <td rowspan="2" style="width: 20%;">
          <strong>
            Value Proposition
            <!-- <a v-if="role === 'Talent'" @click="updateVP()" class="posisiedit">
              <i class="fa fa-pencil-square"></i>
            </a>-->
          </strong>
          <p>
            <!-- <span v-html="parentVP.description"></span> -->
          </p>
        </td>
        <td style="width: 20%;">
          <strong>
            Unfair Advantage
            <!-- <a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit">
              <i class="fa fa-edit"></i>
            </a>-->
          </strong>
          <p>
            <span v-html="dataLean.fields[1].value"></span>
          </p>
        </td>
        <td rowspan="2" style="width: 20%;">
          <strong>
            Segmen Pelanggan
            <!-- <a v-if="role === 'Talent'" @click="updateCS()" class="posisiedit">
              <i class="fa fa-pencil-square"></i>
            </a>-->
          </strong>
          <p>
            <!-- <span v-html="parentCS.name"></span> -->
          </p>

          <div style="text-align: left !important;margin-top: 50px;">
            <!-- <template
              v-for="data in personaAspect.aspect.slice(0,4)">
              {{data.field_template.name}} :
              <template v-if="data.value != null">
                  <span v-html="data.value" :key="data.id"></span>
              </template>
              <template v-else>
                <template v-for="option in data.selected_options">{{option.option.name}}</template>
              </template>
            </template>-->
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <strong>
            Key Metrics
            <!-- <a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit">
              <i class="fa fa-edit"></i>
            </a>-->
          </strong>
          <p>
            <span v-html="dataLean.fields[2].value"></span>
          </p>
        </td>
        <td>
          <strong>
            Channel
            <!-- <a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit">
              <i class="fa fa-edit"></i>
            </a>-->
          </strong>
          <p>
            <span v-html="dataLean.fields[3].value"></span>
          </p>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <strong>
            Cost Structure
            <!-- <a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit">
              <i class="fa fa-edit"></i>
            </a> -->
          </strong>
          <p>
            <span v-html="dataLean.fields[4].value"></span>
          </p>
        </td>
        <td style="background: #f1f1f1;"></td>
        <td colspan="2">
          <strong>
            Revenue Stream
            <!-- <a v-if="role === 'Talent'" @click="editBS(dataLean)" class="posisiedit">
              <i class="fa fa-edit"></i>
            </a> -->
          </strong>
          <p>
            <span v-html="dataLean.fields[5].value"></span>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data: function() {
    return {
      dataLean: {
        id: "6d8d37ef-189d-4562-8ada-b4c121984639",
        business_structure_template: {
          id: "51b8c9f3-dd4b-47f0-ab9d-cd23f416e8d9",
          name: "Lean Canvas",
          description: "Lean Canvas",
          is_removed: false
        },
        is_removed: false,
        fields: [
          {
            id: "1bb79871-6d73-4356-8aeb-9e799d975814",
            field_template: {
              id: "309cdd31-e99b-4dc5-93b6-246f81efb15f",
              name: "Problem",
              min_size: 0,
              max_size: 0,
              position: 1,
              is_removed: false,
              type: "string"
            },
            value:
              "<ol><li>Pangkalan ojek lokasinya cukup jauh dan melelahkan untuk sampai kesana</li></ol>",
            is_removed: false
          },
          {
            id: "ff97dc5f-9d85-480b-bb29-3658a24054ea",
            field_template: {
              id: "6ba3e924-c0b7-4411-8d5a-43ef686dcae2",
              name: "Unfair Advantage",
              min_size: 0,
              max_size: 0,
              position: 2,
              is_removed: false,
              type: "string"
            },
            value:
              "<ol><li>Pelopor aplikasi transportasi online di Indonesia\n</li></ol>",
            is_removed: false
          },
          {
            id: "4e6d18ea-4935-4c1c-aca4-99557660f756",
            field_template: {
              id: "2e2f10df-0d2a-4943-8cb7-b8716d18feea",
              name: "Key Metrics",
              min_size: 0,
              max_size: 0,
              position: 3,
              is_removed: false,
              type: "string"
            },
            value:
              "<ol><li>User Retention Rate, Jumlah user aktif dan jumlah transaksi berhasil, Rating driver (untuk menjaga kualitas), Feedback User</li></ol>",
            is_removed: false
          },
          {
            id: "d81dce78-c67b-4246-9bf4-4e36f4723d1c",
            field_template: {
              id: "df0fe298-dd97-4557-a318-9eea2c178871",
              name: "Channel",
              min_size: 0,
              max_size: 0,
              position: 4,
              is_removed: false,
              type: "string"
            },
            value: "<ol><li>Application (Mobile Based)</li></ol>",
            is_removed: false
          },
          {
            id: "c2619d1a-ff7c-406c-b645-9f1974de416c",
            field_template: {
              id: "0beccd84-31b0-4d97-b053-04bcabde302f",
              name: "Cost Structure",
              min_size: 0,
              max_size: 0,
              position: 5,
              is_removed: false,
              type: "string"
            },
            value:
              "<ol><li>Biaya promo (iklan dan harga), server &amp; maintenance</li></ol>",
            is_removed: false
          },
          {
            id: "8cc1b5df-b15f-4843-bf64-3df547ca9ea9",
            field_template: {
              id: "9c0edeef-1229-4718-8567-2b398de09e54",
              name: "Revenue Stream",
              min_size: 0,
              max_size: 0,
              position: 6,
              is_removed: false,
              type: "string"
            },
            value: "<ol><li>Fee dari transaksi yang berhasil</li></ol>",
            is_removed: false
          }
        ]
      }
    };
  }
};
</script>
