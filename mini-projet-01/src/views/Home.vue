<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Accueil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <div id="container">
        <div class="header">
          <h1>DevFest 2018</h1>
          <h2>Application pour les conférences</h2>
        </div>
        <img class="img" src="https://i.ytimg.com/vi/BMI5lxkoanc/maxresdefault.jpg" alt="logo DevFest 2018">
        <ion-button router-link="conferences">Consulter les conférences</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButton, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

export default defineComponent({
  name: 'FolderPage',
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
  }
});
</script>

<style scoped>
.img {
  display: block;
  height: 400px;
  max-height: 100vh;
  width: 100vw;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border-radius: 10px;
}

#container {
  text-align: center;
  padding: 1.5rem 2rem;
}

.header {
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  text-align: left;
  border-bottom: 1px solid #cccccc;
}

#container h1 {
  margin: 0;
  font-size: 3rem;
  font-weight: bold;
}

#container h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: #8c8c8c;
}
</style>
