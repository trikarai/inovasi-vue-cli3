<template>
  <v-container>
    <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
    <v-dialog v-model="loader" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ $vuetify.t('$vuetify.info.standby') }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-text>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="home-tab"
          data-toggle="tab"
          href="#ValueProposition"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >Value Proposition</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="profile-tab"
          data-toggle="tab"
          href="#LeanCanvas"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >Lean Canvas</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="contact-tab"
          data-toggle="tab"
          href="#BusinessModelCanvas"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >Business Model Canvas</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="contact-tab"
          data-toggle="tab"
          href="#MarketSize"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >Market Size</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="contact-tab"
          data-toggle="tab"
          href="#MarketAnalysis"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >Market Analysis</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="contact-tab"
          data-toggle="tab"
          href="#Competitor"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >Competitor</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="contact-tab"
          data-toggle="tab"
          href="#ValueCurve"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >Value Curve</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="contact-tab"
          data-toggle="tab"
          href="#Swot"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >SWOT Analysis</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="ValueProposition"
        role="tabpanel"
        aria-labelledby="home-tab"
      >Value Proposition</div>
      <div class="tab-pane fade" id="LeanCanvas" role="tabpanel" aria-labelledby="profile-tab">
        <bs-leancanvas />
      </div>
      <div class="tab-pane fade" id="BusinessModelCanvas" role="tabpanel" aria-labelledby="contact-tab">
        <bs-businessmodelcanvas />
      </div>
      <div class="tab-pane fade" id="MarketSize" role="tabpanel" aria-labelledby="contact-tab">Market Size</div>
      <div class="tab-pane fade" id="MarketAnalysis" role="tabpanel" aria-labelledby="contact-tab">Market Analysis</div>
      <div class="tab-pane fade" id="Competitor" role="tabpanel" aria-labelledby="contact-tab">
        <bs-competitor />
      </div>
      <div class="tab-pane fade" id="ValueCurve" role="tabpanel" aria-labelledby="contact-tab">Value Curve</div>
      <div class="tab-pane fade" id="Swot" role="tabpanel" aria-labelledby="contact-tab">
        <BsSwot />
      </div>
    </div>
    </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";
import BsSwot from "./components/BsSwot";
import BsCompetitor from "./components/BsCompetitor";
import BsBusinessmodelcanvas from "./components/BsBusinessmodelcanvas"
import BsLeancanvas from "./components/BsLeancanvas"

export default {
  components: {
    BsSwot,
    BsCompetitor,
    BsBusinessmodelcanvas,
    BsLeancanvas,
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
      err_msg: {details:[""]},
      error: "error",
      loader: false,
      dialogDel: false,
      dialogForm: false,
      dialogFormParent: false,
      edit: false,
      view: false,
      expand: false,
      dataId: "",
      selectedIndex: null,
      data: { total: 0, list: [] },
      parentData: "",
      singleData: { id: "", name: "" },
      active: null,
      items: ["web", "shopping", "videos", "images", "news"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  mounted: function() {},
  methods: {}
};
</script>
