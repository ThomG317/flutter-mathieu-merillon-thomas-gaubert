<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Information téléphone</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <div id="container" v-if="Device.platform">
        <ion-list>
          <ion-item>
            <ion-label>
              <strong>Platform</strong>
              <p>{{ Device.platform }}</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <strong>Version</strong>
              <p>{{ Device.version }}</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <strong>Uuid</strong>
              <p>{{ Device.uuid }}</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <strong>Model</strong>
              <p>{{ Device.model }} ({{ Device.manufacturer }})</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <strong>Connection</strong>
              <p>{{ Network.type }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
      <div class="centered" v-else>
        Vous n'êtes pas sur téléphone !
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonLabel, IonItem } from '@ionic/vue';
import { Device } from "@awesome-cordova-plugins/device";
import { Network } from "@awesome-cordova-plugins/network";

export default defineComponent({
  name: 'FolderPage',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonLabel,
    IonItem
  },
  setup() {

    onMounted(() => {
      console.log(Device);
    });

    return {
      Device,
      Network
    };
  },
});
</script>

<style scoped>

.centered {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8c8c8c;
}

#container {
  text-align: center;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
