import Vue from "vue";
import App from "./App.vue";
import { setupVSlideIn } from "./directives/v_slide_in";

Vue.config.productionTip = false;

Vue.use(setupVSlideIn({ direction: "left", offset: 100 }));

new Vue({
  render: (h) => h(App),
}).$mount("#app");
