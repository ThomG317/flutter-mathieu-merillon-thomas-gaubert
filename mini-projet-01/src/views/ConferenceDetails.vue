<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-button slot="start" color="primary" shape="round" fill="clear" size="small" @click="$router.push({ name: 'Conférences' })">
          <ion-icon slot="icon-only" :ios="arrowBack" :md="arrowBack"></ion-icon>
        </ion-button>
        <ion-title>Détail de la conférence</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="conference">
      <div id="container">
        <h2>
          {{ conference.title }}
          <span v-if="conference.language === 'fr'">🇫🇷</span>
          <span v-if="conference.language === 'en'">🇬🇧</span>
        </h2>
        <ion-badge v-if="conference.complexity === 'Beginner'" color="success">{{ conference.complexity }}</ion-badge>
        <ion-badge v-if="conference.complexity === 'Intermediate'" color="warning">{{ conference.complexity }}</ion-badge>
        <ion-badge v-if="conference.complexity === 'Advanced'" color="danger">{{ conference.complexity }}</ion-badge>
        <p>{{ conference.description }}</p>
        <ion-chip color="danger" v-if="conference.type" outline>
          <ion-label>{{ conference.type }}</ion-label>
        </ion-chip>
        <ion-chip v-for="tag in conference.tags" :key="tag" color="primary" outline>
          <ion-label>{{ tag }}</ion-label>
        </ion-chip>
        <h2 v-if="conference.speakers">Speaker{{ conference.speakers.length > 1 ? 's' : '' }}</h2>
        <ion-list v-if="conference.speakers && Object.entries(speakers).length > 0">
          <ion-item v-for="speakerId in conference.speakers" :key="speakerId">
            <ion-avatar slot="start">
              <img :src="`https://devfest2018.gdgnantes.com/${speakers[speakerId].photoUrl}`" alt="speaker picture"/>
            </ion-avatar>
            <ion-label>
              {{ speakers[speakerId].name }}
              <span class="italic">#{{ speakerId }}</span>
            </ion-label>
          </ion-item>
        </ion-list>
        <br>
        <ion-button @click="goToNote(conference)">Consulter les notes</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from 'vue';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonChip, IonItem, IonBadge, IonLabel, IonList, IonAvatar } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import {useRoute, useRouter} from "vue-router";
import {Storage} from "@capacitor/storage";

export default defineComponent({
  name: 'FolderPage',
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonChip,
    IonItem,
    IonBadge,
    IonLabel,
    IonList,
    IonAvatar
  },
  setup() {
    const route = useRoute();
    const router= useRouter();

    const store = reactive<{ conferences: Array<any>, speakers: Array<any>, conference: any }>({
      conferences: [],
      speakers: [],
      conference: undefined,
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

    async function saveSpeakersStorage(speakers: Array<any>) {
      await Storage.set({
        key: 'speakers',
        value: JSON.stringify(speakers),
      });
    }

    async function getSpeakersStorage(): Promise<Array<any>> {
      const { value } = await Storage.get({
        key: 'speakers',
      });
      if (value !== null)
        return JSON.parse(value) as Array<any>;
      else
        return [];
    }

    async function getApiSpeakers(): Promise<Array<any>> {
      const response = await fetch("https://devfest-nantes-2018-api.cleverapps.io/speakers")
      const speakers = await response.json();
      await saveSpeakersStorage(speakers);
      return speakers;
    }

    async function getSpeakers() {
      const localSpeakers: Array<any> = await getSpeakersStorage();
      if (localSpeakers.length === 0) {
        const speakers = await getApiSpeakers()
        store.speakers = speakers;
      } else {
        store.speakers = localSpeakers;
      }
    }

    function goToNote(conference: any) {
      router.push({ name: "ConférenceNote", params: { id: conference.id, title: conference.title } });
    }

    onMounted(async () => {
      await getConferences();
      store.conference = store.conferences[parseInt(route.params.id.toString())];
      await getSpeakers();
    });

    return {
      ...toRefs(store),
      arrowBack,
      goToNote,
    };
  },
});
</script>

<style scoped>

.title-default {
  padding: 0;
}

#container {
  padding: 1.5rem 2rem;
}

#container h2 {
  margin-top: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 1.5rem 0;
}

#container a {
  text-decoration: none;
}

.italic {
  opacity: .3;
  font-style: italic;
}
</style>
