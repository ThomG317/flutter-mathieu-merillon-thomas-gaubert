<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-button slot="start" color="primary" shape="round" fill="clear" size="small"
                    @click="$router.push({ name: 'DetailsConférence', params: { id: $route.params.id } })">
          <ion-icon slot="icon-only" :ios="arrowBack" :md="arrowBack"></ion-icon>
        </ion-button>
        <ion-title>Note sur la conférence</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="store.note">
      <form class="container" @submit.prevent="saveNote(store.note)">
        <h2>{{ store.note.title }}</h2>
        <ion-textarea rows="10" placeholder="Vos notes..."
                      :value="store.note.content"
                      @ionInput="store.note.content = $event.target.value"
                      required></ion-textarea>
        <ion-button type="submit">Enregistrer</ion-button>
        <ion-button shape="outline" @click="takePicture()" :disabled="!Device.platform">Prendre une photo</ion-button>
      </form>
      <div class="container" v-if="store.note.photos.length > 0">
        <h2>Vos photos</h2>
        <ion-card v-for="pic in store.note.photos" :key="pic">
          <img class="pic" :src="pic" alt="photo note">
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive} from 'vue';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonCard, IonTextarea } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import {useRoute} from "vue-router";
import {Storage} from "@capacitor/storage";
import { Camera, CameraOptions } from "@awesome-cordova-plugins/camera";
import { Device } from "@awesome-cordova-plugins/device";

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
    IonCard,
    IonTextarea,
  },
  setup() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.PNG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,
    }
    const route = useRoute();

    const store = reactive<{ notes: Array<any>, note: any}>({
      notes: [],
      note: {
        id: "",
        title: "",
        photos: [],
        content: "",
      },
    });

    function takePicture() {
      Camera.getPicture(options).then((imageData) => {
        const base64Image = 'data:image/png;base64, ' + imageData;
        store.note.photos.push(base64Image);
        saveNote(store.note);
      });
    }

    async function saveNotesStorage(notes: Array<any>) {
      await Storage.set({
        key: 'notes',
        value: JSON.stringify(notes),
      });
    }

    async function getNotesStorage(): Promise<Array<any>> {
      const { value } = await Storage.get({
        key: 'notes',
      });
      if (value !== null)
        return JSON.parse(value) as Array<any>;
      else
        return [];
    }

    async function checkNote(note: any) {
      const noteOpt = store.notes.find(n => n.id === note.id);
      if (noteOpt) {
        store.note = noteOpt;
      } else {
        store.notes.push(note);
        await saveNotesStorage(store.notes)
      }
    }

    async function saveNote(note: any) {
      const index = store.notes.findIndex(n => n.id === note.id);
      store.notes.splice(index, 1, note);
      saveNotesStorage(store.notes);
    }


    onMounted(async () => {
      store.note.id = route.params.id;
      store.note.title = route.params.title;
      store.notes = await getNotesStorage();
      await checkNote(store.note);
    });

    return {
      store,
      arrowBack,
      saveNote,
      takePicture,
      Device,
    };
  },
});
</script>

<style scoped>

.pic {
  width: 100%;
}

.container {
  padding: 1.5rem 2rem;
}

.container h2 {
  margin-top: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.container strong {
  font-size: 20px;
  line-height: 26px;
}

.container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 1.5rem 0;
}

.container a {
  text-decoration: none;
}
</style>
