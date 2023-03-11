import { createRouter, createWebHistory } from 'vue-router'
import ContactosView from '../views/ListaContactos.vue'
import AgregarContacto from '../views/AgregarContacto.vue'
import EditarContacto from '../views/EditarContacto.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ContactosView
    },
    {
      path: '/contacto/nuevo',
      name: 'agregar',
      component: AgregarContacto
    },
    {
      path: '/contacto/editar/:id',
      name: 'editar',
      component: EditarContacto,
      props: true
    }
  ]
})

export default router
