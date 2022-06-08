<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Liste des conférences</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="conf in conferences" :key="conf.id" :button=true @click="goToConf(conf)">
          <ion-label>
            <h2><b>{{ conf.title }}</b>
              <span v-if="conf.language === 'fr'">🇫🇷</span>
              <span v-if="conf.language === 'en'">🇬🇧</span>
            </h2>
            <ion-badge v-if="conf.complexity === 'Beginner'" color="success">{{ conf.complexity }}</ion-badge>
            <ion-badge v-if="conf.complexity === 'Intermediate'" color="warning">{{ conf.complexity }}</ion-badge>
            <ion-badge v-if="conf.complexity === 'Advanced'" color="danger">{{ conf.complexity }}</ion-badge>
            <p>{{ conf.description }}</p>
            <ion-chip color="danger" v-if="conf.type" outline>
              <ion-label>{{ conf.type }}</ion-label>
            </ion-chip>
            <ion-chip v-for="tag in conf.tags" :key="tag" color="primary" outline>
              <ion-label>{{ tag }}</ion-label>
            </ion-chip>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonChip, IonItem, IonBadge, IonLabel, IonList } from '@ionic/vue';
import { Storage } from '@capacitor/storage';
import {useRouter} from "vue-router";

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
    IonChip,
    IonItem,
    IonBadge,
    IonLabel,
    IonList
  },
  setup() {

    const router = useRouter();

    const store = reactive<{ conferences: Array<any> }>({
      conferences: []
    });

    async function saveConferencesStorage(conferences: Array<any>) {
      await Storage.set({
        key: 'conferences',
        value: JSON.stringify(conferences),
      });
    }

    async function getConferencesStorage(): Promise<Array<any>> {
      const { value } = await Storage.get({
        key: 'conferences',
      });
      if (value !== null)
        return JSON.parse(value) as Array<any>;
      else
        return [];
    }

   async function getApiConferences(): Promise<Array<any>> {
     const response = await fetch("https://devfest-nantes-2018-api.cleverapps.io/sessions")
     const confs = await response.json();
     await saveConferencesStorage(confs);
     return confs;
    }

    async function getConferences() {
      const localConfs: Array<any> = await getConferencesStorage();
      if (localConfs.length === 0) {
        const confs = await getApiConferences()
        store.conferences = confs;
      } else {
        store.conferences = localConfs;
      }
    }

    function goToConf(conference: any) {
      router.push({ name: "DetailsConférence", params: { id: conference.id } });
    }

    onMounted(() => {
      getConferences();
    });

    return  {
      ...toRefs(store),
      goToConf
    }
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
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
