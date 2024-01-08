import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Default from "./presets/default";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(PrimeVue, {
  unstyled: true,
  pt: Default
});
app.use(ConfirmationService);
app.use(ToastService);
app.mount("#app");
