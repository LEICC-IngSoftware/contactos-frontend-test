<template>
   <div class="container mt-3">
    <div class="row">
      <div class="alert alert-danger" role="alert" v-if="errorMensaje">
        {{ errorMensaje }}
      </div>
      <div class="col-lg-4" v-for="contacto in contactos" :key="contacto._id">
        <div class="text-center card card-box" >
            <div class="member-card pt-2 pb-2">
                <div class="">
                    <h4>{{ contacto.nombre }}</h4>
                    <p class="text-muted">{{ contacto.email }} <span>| </span><span>{{ contacto.telefono }}</span></p>
                </div>
                <router-link class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light" :to="`/contacto/editar/${contacto._id}`">Editar</router-link>
                <a class="btn btn-danger mt-3 btn-rounded waves-effect w-md waves-light" @click="eliminarContact(contacto._id)">Eliminar</a>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  export default {
    data() {
      return {
        errorMensaje: "",
        contactos: []
      };
    },
    async mounted() {
      try {
        const contactos_api = await axios.get(`${backend_url}/contacto`);
        this.contactos = contactos_api.data;
      } catch (mensajeError) {
        this.errorMensaje = "Servicio no disponible, no se pueden listar los contactos"
      }
    },
    methods: {
      async eliminarContact(id) {
        try {
          await axios.delete(`${backend_url}/contacto/${id}`);
          const contactos_api = await axios.get('${backend_url}/contacto');
          this.contactos = contactos_api.data;
        } catch (mensajeError) {
          this.errorMensaje = "Servicio no disponible, no se pueden eliminar el contacto"
        }
      }
    }
  };

</script>

<style>
  .card-box {
      padding: 20px;
      border-radius: 3px;
      margin-bottom: 30px;
      background-color: #fff;
  }
  .btn {
    margin-right: 5px;
  }
</style>