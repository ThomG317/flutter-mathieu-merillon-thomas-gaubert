import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: "/home"
  },
  {
    name: "Accueil",
    path: '/home',
    component: () => import ('../views/Home.vue')
  },
  {
    name: "Conférences",
    path: '/conferences',
    component: () => import ('../views/Conferences.vue')
  },
  {
    name: "DetailsConférence",
    path: '/conferences/:id',
    component: () => import ('../views/ConferenceDetails.vue')
  },
  {
    name: "ConférenceNote",
    path: '/conferences/:id/notes',
    component: () => import ('../views/ConferenceNotes.vue')
  },
  {
    name: "Téléphone",
    path: '/phone',
    component: () => import ('../views/Phone.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
