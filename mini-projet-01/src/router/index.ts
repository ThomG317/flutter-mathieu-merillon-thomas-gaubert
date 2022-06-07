import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: "/home"
  },
  {
    path: '',
    redirect: '/home',
    name: "Accueil"
  },
  {
    path: '/:id',
    component: () => import ('../views/FolderPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
